import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import './styles.scss'
import { useQuery } from '@tanstack/react-query';
import { ICocktail } from '../../models/ICocktail';

const Header: React.FC = () => {
  const { data: favorites } = useQuery<ICocktail[]>(['cocktail', 'favorites']);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header className='header'>
      <div>
        <img src='/logo.png' />
      </div>
      <div className='nav-items'>
        <div
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          Home
        </div>
        <div
          className={`nav-item ${isActive('/search') ? 'active' : ''}`}
          onClick={() => navigate('/search')}
        >
          Search
        </div>
        <div
          className={`nav-item ${isActive('/favorites') ? 'active' : ''}`}
          onClick={() => navigate('/favorites')}
        >
          Favorites {favorites?.length}
        </div>
      </div>
    </header>
  );
};

export default Header;
