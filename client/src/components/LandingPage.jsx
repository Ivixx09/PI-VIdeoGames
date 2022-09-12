import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage () {
  return (
    <div>
      <h1> Welcome to my page! </h1>
      <Link to='/home'>
        <button> GO HOME </button>
      </Link>
    </div>
  );
}

