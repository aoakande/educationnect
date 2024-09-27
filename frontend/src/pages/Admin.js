import React, { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { contractPrincipal } from '../utils/contracts';

function Admin() {
  const { doContractCall, authentication } = useConnect();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  if (!authentication.isSignedIn()) {
    return <div>Please sign in to access the admin dashboard.</div>;
  }

  const handleTokenDistribution = async () => {
    if (!recipientAddress || !tokenAmount) return;

    try {
      await doContractCall({
        contractAddress: contractPrincipal,
        contractName: 'educationnect',
        functionName: 'distribute-tokens',
        functionArgs: [recipientAddress, tokenAmount],
        onFinish: data => {
          console.log('Tokens distributed:', data);
          // Handle successful distribution (e.g., show success message, clear form)
        },
        onCancel: () => {
          console.log('Transaction canceled');
        }
      });
    } catch (e) {
      console.error('Failed to distribute tokens:', e);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="token-distribution">
        <h2>Distribute Tokens</h2>
        <input
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Recipient Address"
        />
        <input
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          placeholder="Token Amount"
        />
        <button onClick={handleTokenDistribution}>Distribute Tokens</button>
      </div>
    </div>
  );
}

export default Admin;
