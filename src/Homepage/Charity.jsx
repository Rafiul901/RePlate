// src/Pages/Charity.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import Swal from 'sweetalert2';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const Charity = () => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const [organizationName, setOrganizationName] = useState('');
  const [mission, setMission] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const price = 25;

  useEffect(() => {
    if (price > 0) {
      axios
        .post('/create-payment-intent', { amount: price * 100 })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => {
          Swal.fire('Error', 'Failed to initialize payment', 'error');
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!stripe || !elements || !clientSecret) {
      setError('Stripe not initialized properly.');
      setIsLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card input not found.');
      setIsLoading(false);
      return;
    }

    const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || '',
        },
      },
    });

    if (paymentError) {
      setError(paymentError.message);
    } else if (paymentIntent.status === 'succeeded') {
      setSuccess('✅ Payment successful!');
      Swal.fire('Success', 'Charity request and payment submitted!', 'success');

      await axios.post('/charity-role/submit', {
        name: user.displayName,
        email: user.email,
        organizationName,
        mission,
        paymentIntentId: paymentIntent.id,
      });

      setOrganizationName('');
      setMission('');
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Request Charity Role</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={user?.displayName || ''}
          readOnly
          className="w-full px-4 py-2 border rounded bg-gray-100"
        />
        <input
          type="email"
          value={user?.email || ''}
          readOnly
          className="w-full px-4 py-2 border rounded bg-gray-100"
        />
        <input
          type="text"
          required
          placeholder="Organization Name"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          required
          placeholder="Mission Statement"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        ></textarea>

        <div className="p-4 border rounded bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#374151',
                  '::placeholder': { color: '#9CA3AF' },
                },
                invalid: { color: '#EF4444' },
              },
            }}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={!stripe || isLoading || !organizationName || !mission}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : `Pay $${price} & Submit`}
        </button>
      </form>
    </div>
  );
};

export default Charity;
