import {Link} from "react-router-dom";
import React from "react";
import './Navigator.css';

export const Navigator = () => {
  return (
    <nav>
      <ul className='nav-ul'>
        <li>
          <Link to={`/home`}>Home</Link>
        </li>
        <li>
          <Link to={`sleep-history`}>Sleep History</Link>
        </li>
        <li>
          <Link to={`sleep-suggestions`}>Sleep Suggestions</Link>
        </li>
        <li>
          <Link to={`sleep-disorders`}>Sleep Disorders</Link>
        </li>
      </ul>
    </nav>
  );
};
