// Enhanced Charity component with better email handling
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
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          console.log('Payment intent created successfully');
        })
        .catch((err) => {
          console.error('Failed to create payment intent:', err);
          Swal.fire('Error', 'Failed to initialize payment', 'error');
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    console.log('Starting payment process for user:', user?.email);

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

    try {
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
        console.error('Payment error:', paymentError);
        setError(paymentError.message);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment successful:', paymentIntent.id);
        setSuccess('✅ Payment successful!');
        
        // Now log it in backend
        console.log('Sending to backend:', {
          paymentIntentId: paymentIntent.id,
          organizationName,
          mission
        });

        try {
          const response = await axios.post('/charity-role/success', {
            paymentIntentId: paymentIntent.id,
            organizationName,
            mission
          });

          console.log('Backend response:', response.data);
          
          Swal.fire('Success', 'Charity request and payment submitted successfully!', 'success');
          
          // Reset form
          setOrganizationName('');
          setMission('');
          
          // Optionally redirect or refresh
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          
        } catch (backendError) {
          console.error('Backend error:', backendError);
          setError('Payment succeeded but failed to save request. Please contact support.');
          Swal.fire('Warning', 'Payment succeeded but failed to save request. Please contact support.', 'warning');
        }
      }
    } catch (err) {
      console.error('Payment process error:', err);
      setError('Payment process failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Request Charity Role</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
          <input
            type="text"
            required
            placeholder="Enter your organization name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
          <textarea
            required
            rows={4}
            placeholder="Describe your organization's mission and goals"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
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

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isLoading || !organizationName || !mission}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Processing Payment...' : `Pay $${price} & Submit Request`}
        </button>
      </form>
    </div>
  );
};

export default Charity;