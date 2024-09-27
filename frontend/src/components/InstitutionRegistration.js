import React, { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { contractPrincipal } from '../utils/contracts';

function InstitutionRegistration() {
  const { doContractCall } = useConnect();
  const [institutionName, setInstitutionName] = useState('');

  const handleRegistration = async () => {
    try {
      await doContractCall({
        contractAddress: contractPrincipal,
        contractName: 'educationnect',
        functionName: 'register-institution',
        functionArgs: [institutionName],
        onFinish: data => {
          console.log('Institution registered:', data);
          // Handle successful registration (e.g., show success message, redirect)
        },
        onCancel: () => {
          console.log('Transaction canceled');
        }
      });
    } catch (e) {
      console.error('Failed to register institution:', e);
    }
  };

  return (
    <div className="institution-registration">
      <h2>Register Institution</h2>
      <input
        type="text"
        value={institutionName}
        onChange={(e) => setInstitutionName(e.target.value)}
        placeholder="Institution Name"
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default InstitutionRegistration;
