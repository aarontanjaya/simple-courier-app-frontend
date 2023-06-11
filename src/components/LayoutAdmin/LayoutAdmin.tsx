import React, { useState } from 'react';
import Headerbar from '../UI/Headerbar/Headerbar';
import Sidebar from '../UI/Sidebar/Sidebar';
import Button from '../UI/Button/Button';
import { MdMenu } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './LayoutAdmin.module.scss';

export default function LayoutAdmin() {
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
              to='admin/profile'
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/admin/reports'
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/admin/shippings'
            >
              Manage Shippings
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/admin/promos'
            >
              Manage Promos
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to='/admin/addresses'
            >
              Manage Addresses
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
