import React, { useState } from 'react';
import { Transaction } from '@/utils/types';

interface TransactionDetailsProps {
  transaction: Transaction;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleDetails}>
        <h4 className="text-md font-semibold">Customer: {transaction.customerName} Transaction Date: {transaction.date} Amount: {transaction.transactionAmount}</h4>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div className="mt-4">
          <p className="mb-2">Type: {transaction.type}</p>
          <p className="mb-2">Customer Name: {transaction.customerName}</p>
          <p className="mb-2">Order ID: {transaction.orderId}</p>
          <p className="mb-2">Date: {transaction.date}</p>
          <p className="mb-2">Product: {transaction.product}</p>
          <p className="mb-2">Price: {transaction.price}</p>
          <p className="mb-2">Transaction Type: {transaction.transactionType}</p>
          <p className="mb-2">Transaction Date: {transaction.transactionDate}</p>
          <p className="mb-2">Transaction Amount: {transaction.transactionAmount}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
