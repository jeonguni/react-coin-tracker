import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollars, setDollars] = useState(0);
  const [coinName, setCoinName] = useState('');
  const selectChange = event => {
    setCoinName(event.target.value);
  };
  const onChange = event => {
    setDollars(event.target.value);
  };
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then(response => response.json())
      .then(json => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      <div>
        <label htmlFor="dollars">Dollars you have</label>
        <input type="number" placeholder="$" value={dollars} onChange={onChange} />
        <span>dollars</span>
      </div>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={selectChange}>
          <option>select coin</option>
          {coins.map(coin => (
            <option key={coin.id} value={[coin.name, coin.quotes.USD.price]}>
              {coin.name} ({coin.symbol}: ${coin.quotes.USD.price})
            </option>
          ))}
        </select>
      )}

      <div>
        {coinName !== '' ? (
          <span>
            You can get {Math.floor(dollars / coinName.split(',')[1])} {coinName.split(',')[0]}
          </span>
        ) : (
          'Choose Coin'
        )}
      </div>
    </div>
  );
}

export default App;
