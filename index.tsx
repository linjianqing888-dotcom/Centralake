
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Centralake App Initializing...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Could not find root element.");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Centralake App Rendered Successfully.");
} catch (err) {
  console.error("Render Error:", err);
}
