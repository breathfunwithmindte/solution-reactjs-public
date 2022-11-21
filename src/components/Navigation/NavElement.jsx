import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import FreeStyleIcons from '../FreeStyleIcons';

const NavElement = ({ route_navigation_stuff }) => {
  const navigate = useNavigate();

  return (
    <ListItemButton onClick={() => navigate(route_navigation_stuff.path)}>
      <ListItemIcon>
        <FreeStyleIcons name={route_navigation_stuff.icon} />
      </ListItemIcon>
      <ListItemText 
        primary={route_navigation_stuff.primary_text} 
        secondary={route_navigation_stuff.secondary_text} 
      />
    </ListItemButton>
  );
};

export default NavElement;