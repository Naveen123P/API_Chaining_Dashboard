import React, { useState } from 'react';
import ApiCall from './ApiCall';
import ApiResponse from './ApiResponse';

function ApiChainBuilder() {
  const [apiChain, setApiChain] = useState([]);
  const [successfulCalls, setSuccessfulCalls] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddApiCall = () => {
    setApiChain([{ id: apiChain.length, type: 'GET', url: '', params: {} }]);
  };

  const handleApiCallChange = (id, updatedCall) => {
    setApiChain(apiChain.map(call => (call.id === id ? updatedCall : call)));
  };

  const handleExecuteChain = async () => {
    setLoading(true);
    setError(null);
    setResponses([]);
    try {
      let previousResponse = null;
      for (const apiCall of apiChain) {
        const response = await executeApiCall(apiCall, previousResponse);
        setResponses(prev => [...prev, response]);
        previousResponse = response;

        // Check if the API call is not already in the successfulCalls
        const isCallPresent = successfulCalls.some(call => call.url === apiCall.url && call.params.body === apiCall.params.body);
        if (apiCall.url && !isCallPresent) {
          setSuccessfulCalls(prev => [...prev, apiCall]);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const executeApiCall = async (apiCall, previousResponse) => {
    const { type, url, params } = apiCall;
    let finalUrl = url;

    // Use previousResponse to modify params if needed
    const modifiedParams = { ...params };
    if (previousResponse && previousResponse.id) {
      modifiedParams.userId = previousResponse.id;
    }
    if (type === 'POST' && params) {
      const queryParams = new URLSearchParams(modifiedParams).toString();
      finalUrl = `${url}?${queryParams}`;
    }

    const response = await fetch(finalUrl, {
      method: type,
      headers: { 'Content-Type': 'application/json' },
      body: type === 'POST' ? JSON.stringify(modifiedParams) : null,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <button onClick={handleAddApiCall} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add API Call
      </button>
      {apiChain.map(apiCall => (
        <ApiCall
          key={apiCall.id}
          apiCall={apiCall}
          onChange={handleApiCallChange}
          successfulCalls={successfulCalls}
        />
      ))}
      <button onClick={handleExecuteChain} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Execute Chain
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {responses.map((response, index) => (
        <ApiResponse key={index} response={response} />
      ))}
    </div>
  );
}

export default ApiChainBuilder;