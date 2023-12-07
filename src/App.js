import { useState, useEffect} from 'react';
import './App.css';
import CountryDetail from './components/CountryDetail.js';
import Navbar from './components/Navbar.js';
import ListSearch from './components/ListSearch.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => setCountries(data))
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path='/' element={<ListSearch countries={countries} />} />
            <Route path='/country/:id' element={<CountryDetail countries={countries} />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
