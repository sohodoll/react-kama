/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import s from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const friends = props.state.friends.map((friend) => <div key={friend.id}>*{friend.name}</div>);
  return (
    <>
      <nav className={s.nav}>
        <div className={s.item}>
          <Link to='/profile'>Profile</Link>
        </div>
        <div className={`${s.item} ${s.active}`}>
          <Link to='/dialogs'>Dialogs</Link>
        </div>
        <div className={s.item}>
          <a>News</a>
        </div>
        <div className={s.item}>
          <a>Music</a>
        </div>
        <div className={s.item}>
          <a>Settings</a>
        </div>
        <div className={s.friends}>{friends}</div>
      </nav>
    </>
  );
};

export default Navbar;
