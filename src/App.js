import React from "react";
import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="App">
      <div className="card-container">
        {" "}
        {/* Apply the card container style */}
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
