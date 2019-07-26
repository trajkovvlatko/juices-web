import React from 'react';
import Auth from './Auth';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

import './styles/global.css';

export default function Header() {
  return (
    <div className="header">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <Link to="/">Recipes</Link>
          </Typography>
          <div className="auth-buttons">
            <Auth />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
