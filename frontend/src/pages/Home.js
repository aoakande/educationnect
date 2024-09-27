import React from 'react';
import { useConnect } from '@stacks/connect-react';
import { Person } from '@stacks/profile';

function Home() {
  const { authentication } = useConnect();
  const { userSession } = authentication;

  const handleSignIn = () => {
    userSession.redirectToSignIn();
  };

  return (
    <div className="home">
      <h1>Welcome to EduChain Connect</h1>
      {!userSession.isUserSignedIn() ? (
        <button onClick={handleSignIn}>Sign In with Stacks</button>
      ) : (
        <div>
          <p>Welcome, {Person.fromLegacyFormat(userSession.loadUserData().profile).name()}</p>
          <button onClick={() => userSession.signUserOut()}>Sign Out</button>
        </div>
      )}
      <section>
        <h2>About EduChain Connect</h2>
        <p>EduChain Connect is a blockchain-based platform that connects educational institutions, students, and content creators.</p>
      </section>
    </div>
  );
}

export default Home;
