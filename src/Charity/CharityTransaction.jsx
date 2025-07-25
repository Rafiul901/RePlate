import React, { useState, useEffect } from 'react';
import { 
  FaReceipt, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle 
} from 'react-icons/fa';

const CharityTransaction = ({ userEmail = "tyson@2.com" }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [userEmail]);

const fetchTransactions = async () => {
  setLoading(true);
  setError(null);

  try {
    // Use this to fetch ALL transactions
    const response = await fetch("http://localhost:3000/charity-role/transactions");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    setTransactions(data);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    setError('Failed to fetch transaction history. Please try again.');
  } finally {
    setLoading(false);
  }
};


  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return <FaCheckCircle className="text-success" />;
      case 'pending': return <FaClock className="text-warning" />;
      case 'rejected': return <FaTimesCircle className="text-error" />;
      default: return <FaClock className="text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const base = "badge badge-sm font-medium";
    switch (status.toLowerCase()) {
      case 'approved': return `${base} badge-success`;
      case 'pending': return `${base} badge-warning`;
      case 'rejected': return `${base} badge-error`;
      default: return `${base} badge-ghost`;
    }
  };

  const formatAmount = (amountInCents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amountInCents / 100);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="bg-base-100 rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaReceipt className="text-2xl text-primary" />
          <h2 className="text-2xl font-bold text-base-content">Transaction History</h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-base-100 rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaReceipt className="text-2xl text-primary" />
          <h2 className="text-2xl font-bold text-base-content">Transaction History</h2>
        </div>
        <div className="alert alert-error">
          <FaTimesCircle />
          <span>{error}</span>
          <button className="btn btn-sm btn-outline" onClick={fetchTransactions}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <FaReceipt className="text-2xl text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-base-content">Transaction History</h2>
          <p className="text-base-content/70 text-sm">All charity role request transactions</p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <FaReceipt className="text-6xl text-base-content/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-base-content/70 mb-2">No Transactions Yet</h3>
          <p className="text-base-content/50">Your charity role request transactions will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Organization</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Mission</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <FaReceipt className="text-primary" />
                      <div>
                        <div className="font-mono text-sm font-medium">
                          {transaction.transactionId.substring(0, 20)}...
                        </div>
                        <div className="text-xs text-base-content/50">Payment ID</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold text-base-content">{transaction.organizationName}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-success text-sm" />
                      <span className="font-semibold text-success">{formatAmount(transaction.amount)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-base-content/50 text-sm" />
                      <span className="text-sm">{formatDate(transaction.date)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <span className={getStatusBadge(transaction.status)}>{transaction.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="max-w-xs">
                      <p className="text-sm text-base-content/70 line-clamp-2">{transaction.mission}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {transactions.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Total Transactions</div>
            <div className="stat-value text-primary">{transactions.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Total Spent</div>
            <div className="stat-value text-success">
              {formatAmount(transactions.reduce((sum, t) => sum + t.amount, 0))}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Approved</div>
            <div className="stat-value text-success">
              {transactions.filter(t => t.status === 'Approved').length}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">
              {transactions.filter(t => t.status === 'Pending').length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharityTransaction;
