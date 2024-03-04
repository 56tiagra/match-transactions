import { MatchedTransaction } from '@/utils/types';
import React from 'react';
import TransactionDetails from './TransactionDetails';

interface ResultListProps {
  matchedTransactions: MatchedTransaction[];
}

const ResultList: React.FC<ResultListProps> = ({ matchedTransactions }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Matched Transactions</h2>
      {matchedTransactions.map((matchedTransaction, index) => (
        <div key={index} className={`mb-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} p-4 rounded-lg`}>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Order ID: {matchedTransaction.order.orderId}</h3>
              <p className="mb-1">Customer Name: {matchedTransaction.order.customerName}</p>
            </div>
            <div>
              <p className="mb-1">Reconciled: {matchedTransaction.isReconciled ? 'Yes' : 'No'}</p>
              <p className="mb-1">Number of Transactions: {matchedTransaction.transactions.length}</p>
            </div>
          </div>
          {matchedTransaction.transactions.map((transaction, idx) => (
            <TransactionDetails key={idx} transaction={transaction} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResultList;
