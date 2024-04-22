import {NavLink} from "react-router-dom";
import React from "react";
import './Navigator.css';

export const Navigator = () => {
  return (
    <nav>
      <ul className='nav-ul'>
        <li>
          <NavLink
            to='/home'
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>Home</NavLink>
        </li>
        <li>
          <NavLink
            to='/sleep-suggestions'
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>Sleep Suggestions</NavLink>
        </li>
        <li>
          <NavLink
            to='/sleep-disorders'
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>Sleep Disorders</NavLink>
        </li>
      </ul>
    </nav>
  );
};
