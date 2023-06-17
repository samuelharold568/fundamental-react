import React from "react";
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="nav-container">
      <ul>
        <li>
          <Link to="/">Active</Link>
        </li>
        <li>
          <Link to="/add">Add</Link>
        </li>
        <li>
          <Link to="/archived">Archived</Link>
        </li>
      </ul>
    </nav>  
  ) 
}