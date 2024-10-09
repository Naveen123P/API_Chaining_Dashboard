import React, { useState } from 'react';

function ApiCall({ apiCall, onChange, successfulCalls }) {
  const [showSuccessfulCalls, setShowSuccessfulCalls] = useState(false);

  const handleTypeChange = (e) => {
    onChange(apiCall.id, { ...apiCall, type: e.target.value });
  };

  const handleUrlChange = (e) => {
    onChange(apiCall.id, { ...apiCall, url: e.target.value });
  };

  const handleParamsChange = (e) => {
    onChange(apiCall.id, { ...apiCall, params: { ...apiCall.params, [e.target.name]: e.target.value } });
  };

  const handleSelectSuccessfulCall = (call) => {
    onChange(apiCall.id, { ...apiCall, params: { ...apiCall.params, body: call.params.body} });
    setShowSuccessfulCalls(false);
  };

  return (
    <div className="mb-4 relative">
      <select value={apiCall.type} onChange={handleTypeChange} className="mr-2">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
      <input
        type="text"
        value={apiCall.url}
        onChange={handleUrlChange}
        placeholder="API URL"
        className="border-2 p-2 mr-2 w-full"
      />
      {apiCall.type === 'POST' && (
        <div className="relative">
          <textarea
            name="body"
            value={apiCall.params.body || ''}
            onChange={handleParamsChange}
            placeholder="Request Body"
            className="border-2 p-2 h-40 my-2 w-full"
          />
          {successfulCalls.length > 0 && (
            <button
              onClick={() => setShowSuccessfulCalls(!showSuccessfulCalls)}
              className="absolute top-0 right-0 mt-2 mr-2 bg-green-500 text-white p-1 rounded-full"
            >
              &#x2714;
            </button>
          )}
          {showSuccessfulCalls && (
            <div className="absolute top-0 right-0 mt-10 mr-2 bg-white border p-2 rounded shadow-lg max-h-40 overflow-y-auto w-full overflow-auto max-w-full">
              {successfulCalls.map((call, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleSelectSuccessfulCall(call)}
                >
                  <pre className="text-xs">{JSON.stringify(call.params.body, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ApiCall;