import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as FavIcon } from '../../images/favorite.svg';
import './styles.scss'
import { useQuery } from '@tanstack/react-query';
import { ICocktail } from '../../models/ICocktail';

const Header: React.FC = () => {
  const { data: favorites } = useQuery<ICocktail[]>(['cocktail', 'favorites']);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderFixed(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header data-testid="header" className={`header ${isHeaderFixed ? 'fixed' : ''}`}>
      <div className='logo-image'>
        <img src='/logo.png' alt="Logo" />
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
          <FavIcon />
          {favorites && <div className='fav-number'>{favorites?.length}</div> }
        </div>
      </div>
    </header>
  );
};

export default Header;
