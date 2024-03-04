import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionDetails from './TransactionDetails';

const mockTransaction = {
  type: 'txn',
  customerName: 'John Doe',
  orderId: '123456',
  date: '2024-03-05',
  product: 'Product ABC',
  price: 10.99,
  transactionType: 'paymentReceived',
  transactionDate: '2024-03-05',
  transactionAmount: 10.99
};

describe('TransactionDetails', () => {

  it('toggles the details when clicking on the toggle button', () => {
    const { getByText, queryByText, getByRole } = render(<TransactionDetails transaction={mockTransaction} />);

    expect(queryByText('Type: txn')).toBeNull();
    expect(queryByText('Order ID: 123456')).toBeNull();
    expect(queryByText('Product: Product ABC')).toBeNull();
    expect(queryByText('Price: 10.99')).toBeNull();
    expect(queryByText('Transaction Type: paymentReceived')).toBeNull();
    expect(queryByText('Transaction Date: 2024-03-05')).toBeNull();
    expect(queryByText('Transaction Amount: 10.99')).toBeNull();

    fireEvent.click(getByRole('collaps-header')); // Click the toggle button

    expect(getByText('Type: txn')).toBeInTheDocument();
    expect(getByText('Order ID: 123456')).toBeInTheDocument();
    expect(getByText('Product: Product ABC')).toBeInTheDocument();
    expect(getByText('Price: 10.99')).toBeInTheDocument();
    expect(getByText('Transaction Type: paymentReceived')).toBeInTheDocument();
    expect(getByText('Transaction Date: 2024-03-05')).toBeInTheDocument();
    expect(getByText('Transaction Amount: 10.99')).toBeInTheDocument();
  });
});
