"use client"
import React, { useState } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import { matchTransactionsToOrders } from '../utils/transactionMatcher';
import { Transaction, Order, MatchedTransaction } from '../utils/types';
import ResultList from '@/components/ResultList';
import BaseInput from '@/components/BaseInput';

const Home: React.FC = () => {
  const [ordersInput, setOrdersInput] = useState('');
  const [transactionsInput, setTransactionsInput] = useState('');
  const [fuzzyMatch, setfuzzyMatch] = useState(false);
  const [matchedTransactions, setMatchedTransactions] = useState<MatchedTransaction[]>([]);

  const handlefuzzyMatchToggle = () => {
    setfuzzyMatch((prevfuzzyMatch) => !prevfuzzyMatch);
  };

  const handleProcessMatch = () => {
    const orders: Order[] = JSON.parse(ordersInput);
    const transactions: Transaction[] = JSON.parse(transactionsInput);

    // Call the matching function based on fuzzyMatch flag
    const matches = matchTransactionsToOrders(transactions, orders, fuzzyMatch);
    setMatchedTransactions(matches);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Match Transactions to Orders</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 border border-gray-300 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Orders Input</h2>
          <BaseInput value={ordersInput} onChange={setOrdersInput} placeholder='Orders json'/>
        </div>
        <div className="w-full md:w-1/2 border border-gray-300 rounded-md p-4 mt-4 md:mt-0">
          <h2 className="text-lg font-semibold mb-2">Transactions Input</h2>
          <BaseInput value={transactionsInput} onChange={setTransactionsInput} placeholder='Transactions json'/>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <ToggleSwitch checked={fuzzyMatch} onChange={handlefuzzyMatchToggle} />
        <label className="ml-2">Exact Match</label>
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleProcessMatch}>Process Match</button>
      </div>
      <div className="mt-4">
        <ResultList matchedTransactions={matchedTransactions} />
      </div>
    </div>
  );
};

export default Home;
