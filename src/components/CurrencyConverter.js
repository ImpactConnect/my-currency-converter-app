import React, { useState, useEffect } from "react";

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
      <h1>Currency Converter</h1>
      <div>
        <label> Enter The Amount to Convert: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <label>FROM (select a Currency)</label>
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
        <br />
        <br />
        <label>TO (select a Currency)</label>
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
        <br />
        <button onClick={convertCurrency}>Convert</button>
      </div>
      <div>
        {convertedAmount !== null && (
          <p>
            {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
