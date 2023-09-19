import React, { useState, useEffect } from "react";

const centerDivStyle = {
  display: "flex",
  justifyContent: "center", // Horizontal centering
  alignItems: "center", // Vertical centering
};

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/currencies")
      .then((response) => response.json())
      .then((data) => setCurrencies(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const convertCurrency = () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    } else {
      const fromRate = currencies[fromCurrency].exchangeRate;
      const toRate = currencies[toCurrency].exchangeRate;
      const converted = (amount / fromRate) * toRate;
      setConvertedAmount(converted.toFixed(2)); // Round to 2 decimal places
    }
  };

  return (
    <div>
      <h1 style={centerDivStyle}>Currency Converter</h1>
      <div>
        <section> Enter The Amount to Convert: </section>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <br />
        <label>CONVERT FROM </label>
        <br />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(currencies).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencies[currencyCode].name}
            </option>
          ))}
        </select>
        <span>(select a Currency Type)</span>
        <br />
        <br />
        <label>TO</label>
        <br />
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(currencies).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencies[currencyCode].name}
            </option>
          ))}
        </select>
        <span>(select a Currency Type)</span>

        <br />
        <button onClick={convertCurrency}>Convert</button>
      </div>
      <div>
        <p>CONVERSION RESULT</p>
        {convertedAmount !== null && (
          <p>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
