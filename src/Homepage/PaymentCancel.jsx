import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any stored form data since payment was cancelled
    localStorage.removeItem('orgName');
    localStorage.removeItem('mission');
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <div className="text-yellow-600 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Payment Cancelled</h2>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/charity')}
            className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;