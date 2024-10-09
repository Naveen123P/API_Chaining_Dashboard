import React from 'react';
import ApiChainBuilder from './components/ApiChainBuilder';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">API Chaining Dashboard</h1>
      <ApiChainBuilder />
    </div>
  );
}

export default App;