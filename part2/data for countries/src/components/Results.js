import React from 'react'
import Notifier from './Notifier'
import CountryInfo from './CountryInfo'
import Countries from './Countries'

export default function Results({result}) {
    if (result.length > 10) return <Notifier text='Too many matches, specify another filter' />
    if (result.length === 1) return <CountryInfo country={result[0]} />
    return <Countries countries={result} />
  }
