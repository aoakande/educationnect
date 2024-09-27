import React, { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { contractPrincipal } from '../utils/contracts';

function CredentialIssuance() {
  const { doContractCall } = useConnect();
  const [completedCourses, setCompletedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentAddress, setStudentAddress] = useState('');

  useEffect(() => {
    // Fetch completed courses
    // This would typically involve calling a read-only function on your smart contract
    // For now, we'll use dummy data
    setCompletedCourses([
      { id: 1, name: 'Introduction to Blockchain' },
      { id: 2, name: 'Advanced Smart Contracts' },
    ]);
  }, []);

  const handleCredentialIssuance = async () => {
    if (!selectedCourse || !studentAddress) return;

    try {
      await doContractCall({
        contractAddress: contractPrincipal,
        contractName: 'educationnect',
        functionName: 'issue-credential',
        functionArgs: [studentAddress, selectedCourse],
        onFinish: data => {
          console.log('Credential issued:', data);
          // Handle successful issuance (e.g., show success message, update UI)
        },
        onCancel: () => {
          console.log('Transaction canceled');
        }
      });
    } catch (e) {
      console.error('Failed to issue credential:', e);
    }
  };

  return (
    <div className="credential-issuance">
      <h2>Issue Credential</h2>
      <input
        type="text"
        value={studentAddress}
        onChange={(e) => setStudentAddress(e.target.value)}
        placeholder="Student Address"
      />
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select a course</option>
        {completedCourses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
      <button onClick={handleCredentialIssuance}>Issue Credential</button>
    </div>
  );
}

export default CredentialIssuance;
