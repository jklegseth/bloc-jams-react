import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../css/images/shadow_play_logo.png';

const Header = () => {
  return (
    <header>
      <nav className="navbar">
         <Link to="/" className="logo">
             <img src={logo} alt="ShadowPlay" />
         </Link>
         <div className="links-container">
            <Link to="/library" className="navbar-link">library</Link>
         </div>
      </nav>
    </header>
  )
}

export default Header;
