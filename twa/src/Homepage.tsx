"use client"

import ConnectButton from './Components/ConnectButton';
import Request from './Components/Request';

function HomePage() {
  return (
    <main className='main-container'>
      <div className="button-container">
        <ConnectButton />
      </div>
      <Request/>
    </main>
  );
};

export default HomePage;
