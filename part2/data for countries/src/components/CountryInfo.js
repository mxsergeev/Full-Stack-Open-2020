import React from 'react'
import Weather from './Weather'

export default function CountryInfo({country}) {

  return (
    <>
      <h1>{country.name}</h1>
      capital {country.capital} <br />
      population {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(element => {
        return <li key={element.name}>{element.name}</li>
        })}
      </ul>
      <img src={country.flag} height='100px' alt='flag'></img>
      <Weather city={country.capital} />
    </>
  )
}
