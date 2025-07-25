// Enhanced CharityTransactions component with debugging
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authentication/AuthContext';
import { SyncLoader } from 'react-spinners';

const CharityTransactions = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!user?.email) {
          console.log('No user email found:', user);
          setError('No user email found');
          setLoading(false);
          return;
        }

        console.log('Fetching transactions for email:', user.email);
        
        const res = await axios.get(
          `https://replate-backend.vercel.app/charity-role/transactions/${user.email}`
        );
        
        console.log('API Response:', res.data);
        setTransactions(res.data);
        
        if (res.data.length === 0) {
          console.log('No transactions found for user');
        }
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
        console.error('Error details:', err.response?.data);
        setError(`Failed to fetch transactions: ${err.response?.data?.error || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user?.email) {
      fetchTransactions();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  // Debug render
  console.log('CharityTransactions render:', { user, authLoading, loading, transactions, error });

  if (authLoading || loading) {
    return <SyncLoader></SyncLoader>;
  }

  if (!user) {
    return <p className="text-center text-red-500">Please log in to view your transactions.</p>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded">
        <p className="text-center text-gray-500">No transaction history found.</p>
        <p className="text-sm text-gray-400 mt-2">
          User email: {user.email}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow border-2 border-blue-600">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Transaction History</h2>
      <p className="text-sm text-gray-500 mb-4">
        Showing {transactions.length} transaction(s) for {user.email}
      </p>
      <ul className="space-y-3">
        {transactions.map((tx, index) => (
          <li
            key={index}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <p><strong>ID:</strong> {tx.transactionId}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  tx.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tx.status}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p><strong>Amount:</strong> ${(tx.amount / 100).toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                {new Date(tx.date).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharityTransactions;