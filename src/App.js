// client/src/App.js

import React from "react";
import "./App.css";
import TransactionsTable from "./components/TransactionsTable";

function App() {
  return (
    <div className="App">
      <h1>MERN Stack Coding Challenge</h1>
      <TransactionsTable />
    </div>
  );
}

export default App;
