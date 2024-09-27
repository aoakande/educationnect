import React from 'react';
import { useConnect } from '@stacks/connect-react';
import CourseCreation from '../components/CourseCreation';
import CredentialIssuance from '../components/CredentialIssuance';

function Institution() {
  const { authentication } = useConnect();

  if (!authentication.isSignedIn()) {
    return <div>Please sign in to access the institution dashboard.</div>;
  }

  return (
    <div className="institution-dashboard">
      <h1>Institution Dashboard</h1>
      <CourseCreation />
      <CredentialIssuance />
    </div>
  );
}

export default Institution;
