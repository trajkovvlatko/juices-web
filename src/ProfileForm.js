import React from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default function Profile(props) {
  return (
    <div className={`profile-form ${props.active ? '' : 'inactive'}`}>
      <List component="nav" aria-label="Main mailbox folders">
        <ListItem button>
          <ListItemText primary={props.name} />
        </ListItem>

        <Divider />

        <ListItem component={Link} to="/favorites" button onClick={props.onClick}>
          <ListItemText primary="My favorites" />
        </ListItem>

        <Divider />

        <ListItem component={Link} to="/profile" button onClick={props.onClick}>
          <ListItemText primary="My profile" />
        </ListItem>

        <Divider />

        <ListItem button onClick={props.onSignOut}>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </div>
  );
}
