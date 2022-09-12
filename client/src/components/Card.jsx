import React from 'react';

export default function Card ({name, image, genre}) {
  return (
    <div>
      <h3>{name}</h3>
      <h3>{genre}</h3>
      <img src={image} alt="Pic not found. :C" width= "200px" height= "250px"/>
    </div>
  )
}