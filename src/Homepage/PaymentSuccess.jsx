import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:3000';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setIsProcessing(false);
        return;
      }

      try {
        // Get stored form data
        const organizationName = localStorage.getItem('orgName');
        const mission = localStorage.getItem('mission');

        if (!organizationName || !mission) {
          setError('Form data not found. Please try again.');
          setIsProcessing(false);
          return;
        }

        // Submit the charity role request
        const response = await axios.post('/charity-role/success', {
          sessionId,
          organizationName,
          mission
        });

        if (response.data.success) {
          // Clear localStorage
          localStorage.removeItem('orgName');
          localStorage.removeItem('mission');

          // Show success message
          Swal.fire({
            title: 'Success!',
            text: 'Your charity role request has been submitted successfully. We will review it and get back to you soon.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate to dashboard or charity page
            navigate('/charity');
          });
        } else {
          setError('Failed to submit request');
        }
      } catch (error) {
        console.error('Payment success handler error:', error);
        setError('An error occurred while processing your request');
        
        // Show error message
        Swal.fire({
          title: 'Error',
          text: 'There was an issue processing your request. Please contact support.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        setIsProcessing(false);
      }
    };

    handlePaymentSuccess();
  }, [sessionId, navigate]);

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Payment Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/charity')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        {isProcessing ? (
          <>
            <div className="text-green-600 text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Processing Payment</h2>
            <p className="text-gray-600 mb-6">Please wait while we process your charity role request...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          </>
        ) : (
          <>
            <div className="text-green-600 text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your charity role request has been submitted successfully.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;