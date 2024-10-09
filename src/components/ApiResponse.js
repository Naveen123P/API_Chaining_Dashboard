import React from 'react';

function ApiResponse({ response }) {
  return (
    <div className="bg-gray-200 p-4 rounded mt-4 w-full overflow-auto max-w-full">
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default ApiResponse;