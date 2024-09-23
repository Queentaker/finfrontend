import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { RestApi } from './RestApi';
import LinePlot from "./LinePlot";

function App() {
  const [status, setStatus] = useState<string | string>("no call yet"); // State to store the status

  const handleHealthCheck = async () => {
    try {
      const response = await RestApi.health();
      setStatus(response.data.status); // Set the status from the response
      console.log("API Health Status:", response.data.status); // Log the status
    } catch (error) {
      console.error("Error fetching health check:", error);
      setStatus('Error fetching health check'); // Handle errors
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <h1 className="text-3xl text-blue-500 font-bold underline">
            Hello world!
          </h1>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>

          {/* Button to trigger health check */}
          <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={handleHealthCheck}
          >
            Check API Health
          </button>

          {/* Display the API status */}
          {status && (
              <p className="mt-4 text-green-500">
                API Status: {status}
              </p>
          )}
          <LinePlot />
        </header>
      </div>
  );
}

export default App;
