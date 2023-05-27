import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src='https://ru-designhelp.livejournal.com/favicon.ico' alt='sad' />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {' '}
            <div>{props.login}</div> <button onClick={props.logout}>logout</button>{' '}
          </div>
        ) : (
          <NavLink to={'/login'}>login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
