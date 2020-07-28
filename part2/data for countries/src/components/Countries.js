import React, { useState } from 'react'
import CountryInfo from './CountryInfo'

export default function Countries({countries}) {
    const [showMore, setShowMore] = useState({});
  
    if (showMore.name) {
      return <CountryInfo country={showMore} />
    }
    else return (
      <div>
        {countries.map(country => {
          return ( 
            <div key={country.name}> 
              {country.name} <br />
              <button onClick={() => setShowMore(country) }>show</button>
            </div>
          )
        })}
      </div>
    )
}