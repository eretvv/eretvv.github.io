
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className='header'>
      <Link className='header-link' to="/">Главная</Link>
      <Link className='header-link' to="/products">Продукты</Link>
    </header>
  );
};

export default Header;
