import React from 'react';

const Filter = ({ handleSearchOption }) => {
  return (
    <>
    filter shown with: <input onChange={handleSearchOption}/> 
    </>
  )
}

export default Filter