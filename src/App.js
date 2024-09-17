import React, { useState } from 'react';
import { ethers } from 'ethers';

const BalanceChecker = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const checkBalance = async () => {
    if (!ethers.utils.isAddress(address)) {
      setError('Invalid Ethereum address');
      setBalance(null);
      return;
    }

    try {
      const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      setBalance(balanceEth);
      setError('');
    } catch (err) {
      setError('Error fetching balance');
      setBalance(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ethereum Balance Checker</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Ethereum address"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={checkBalance}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Check Balance
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {balance !== null && (
        <p className="mt-2">
          Balance: {balance} ETH
        </p>
      )}
    </div>
  );
};

export default BalanceChecker;