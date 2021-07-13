import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = props => {
  // const data = props.data;
  return (
    <span>
	    <NavLink to='/'>
	      	{props.title}
	      	{props.link}
	    </NavLink>
    </span>
  );
};

export default NavItem;
