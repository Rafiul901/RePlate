import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';

const CharityTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharityTransactions = async () => {
    try {
      const res = await fetch(`http://localhost:3000/charity-role/transactions/${user?.email}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error('Error fetching charity transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchCharityTransactions();
  }, [user?.email]);

  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Approved': return 'text-green-700 bg-green-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Charity Role Transaction History</h2>

      {loading ? (
        <div className="text-center mt-10">
          <span className="loading loading-spinner text-green-600 loading-lg"></span>
          <p className="mt-2 text-gray-600">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <p className="text-gray-600 text-center">No charity role transactions found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-lime-100 text-green-800 text-left">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Transaction ID</th>
                <th className="px-4 py-3 border-b">Amount</th>
                <th className="px-4 py-3 border-b">Date</th>
                <th className="px-4 py-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={tx.transactionId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b text-xs text-gray-700">{tx.transactionId}</td>
                  <td className="px-4 py-3 border-b font-semibold text-green-700">${(tx.amount / 100).toFixed(2)}</td>
                  <td className="px-4 py-3 border-b">{new Date(tx.date).toLocaleString()}</td>
                  <td className="px-4 py-3 border-b">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${statusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CharityTransactions;
