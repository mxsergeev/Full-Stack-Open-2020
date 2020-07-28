import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Results from './components/Results'

function App() {
  const [countryData, setCountryData] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      const data = res.data;
      setCountryData(data);
    });
  }, []);

  const searchHandler = (e) => {
    const foundResults = countryData.filter(country => 
      country.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );
    setResult(foundResults);
  }

  return (
    <div>
      <input onChange={searchHandler} /> 
      <Results result={result} />
    </div>
  );
}

export default App;