import React, { useState } from 'react'

function App() {
  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState('');
  const [additionalData, setAdditionalData] = useState('')
  const [isEmpty, setIsEmpty] = useState(true)
  const [throwErr, setThrowErr] = useState(null);
  const [darkMode, setDarkMode] = useState(false)

  // this fetches two data from different versions of the same api
  const fetchData = () => {
    fetch(`https://restcountries.com/v2/name/${country}`)
      .then(res => {
        if(!res.ok){
          throw Error("failed to fetch data");
        }
        return res.json();
      })
      .then(data => {
        setCountryData(data[0]);
        return fetch(`https://restcountries.com/v3.1/name/${country}`)
      })
      .then(res => res.json())
      .then(data => {
        setAdditionalData(data[0]);
        setIsEmpty(false)
      })
      .catch(err => {
        setThrowErr(err)
        console.log(err)
      });
  }

  return (
    <div className={`App ${darkMode && "dark"}`}>
    <button className='toggle-dark' onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "Dark Mode": "Light Mode"}
    </button>
    <div className='input-container'>
      <input
        type="text"
          required
          placeholder="write your country here"
          value={country}
          onChange={e => setCountry(e.target.value)}
      />
      <button onClick={fetchData}>Search</button>
    </div>

      {isEmpty ? <h1 className='empty'>Write country name</h1> :
        throwErr ? <h1 className='empty'>error... {throwErr}</h1>:
        <div className='main-container'>
          <div className='main-info'>
            <h1>{countryData.name} <img src={countryData.flags.png} alt=""/> </h1>
            <h3>Demonym: {countryData.demonym}</h3>
            <p>
              {countryData.name} with its capital {countryData.capital} is located in {countryData.subregion}.
              <br/><br/> {countryData.name} has an approximate population of {countryData.population}, that uses {countryData.currencies[0].name}({countryData.currencies[0].symbol}) as their main currency.
            </p>
          </div>
            <div className='btn-container'>
              <a href={additionalData.maps.googleMaps}><button>Google Maps</button></a>
              <a href={additionalData.maps.openStreetMaps}><button>OpenStreets Maps</button></a>
            </div>
        </div>
        
        
  }
    </div>
  );
}

export default App;