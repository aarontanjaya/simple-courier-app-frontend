import React, { useState } from 'react';
import Headerbar from '../UI/Headerbar/Headerbar';
import Sidebar from '../UI/Sidebar/Sidebar';
import Button from '../UI/Button/Button';
import { MdMenu } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './LayoutUser.module.scss';

export default function LayoutUser() {
  const [show, setShow] = useState<boolean>(false);
  const activeStyle = {
    color: 'grey',
  };
  const Nav = (
    <>
      <nav className={`${styles.navbar}`}>
        <NavLink to='/'>
          <h3 className={`${styles.logo}`}>Click&apos;nGo</h3>
        </NavLink>
        <ul className={`${styles.navbar__list}`}>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/profile'
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/shippings'
            >
              Shippings
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/new-shipping'
            >
              New Shipping
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/top-up'
            >
              Top Up
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/addresses'
            >
              Addresses
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/gacha'
            >
              Play Gacha
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/logout'
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
  return (
    <>
      <Sidebar body={Nav} show={show} setShow={setShow}>
        <Headerbar>
          <Button onClick={() => setShow(!show)} variant='transparent'>
            <MdMenu className={`${styles.menu__icon}`} />
          </Button>
        </Headerbar>
        <Outlet />
      </Sidebar>
    </>
  );
}
