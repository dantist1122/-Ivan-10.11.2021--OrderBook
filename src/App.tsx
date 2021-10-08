import React from 'react';
import './App.css';
import OrderTable from './OrderTable';

const App = () => {
  return (
    <div className="App">
      <div className="header">OrderBook</div>
      <div className="App-container">
        <OrderTable />
      </div>
    </div>
  );
}

export default App;
