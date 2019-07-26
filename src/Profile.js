import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UserContext from './contexts/user-context';
import NotificationContext from './contexts/notification-context';
import Loading from './Loading';
import axios from 'axios';
import {getHeaders} from './helpers';

let newName, newPassword, newConfirmPassword;

export default function Profile() {
  const userContext = useContext(UserContext);
  const notificationContext = useContext(NotificationContext);

  if (!userContext.state.user.name) {
    getCurrentUser();
  }

  async function getCurrentUser() {
    const url = `${process.env.REACT_APP_API_HOST}/current_user.json`;
    try {
      const response = await axios.get(url, {headers: getHeaders()});
      userContext.setUser(response.data);
    } catch (e) {
      console.log('Not logged in.');
    }
  }

  function onUpdate() {
    if (!newName && !newPassword) {
      return;
    }

    let data = {name: newName};
    if (newPassword && newConfirmPassword) {
      if (newPassword === newConfirmPassword) {
        data.password = newPassword;
      } else {
        notificationContext.setMessage('Passwords mismatch.', 'error');
        return;
      }
    }

    axios
      .patch(`${process.env.REACT_APP_API_HOST}/users`, data, {
        headers: getHeaders(),
      })
      .then(response => {
        userContext.setUser(response.data);
        notificationContext.setMessage(
          'Successfully updated profile.',
          'success',
        );
      })
      .catch(() => {
        notificationContext.setMessage('Error updating user.', 'error');
      });
  }

  function onDelete() {
    if (!window.confirm('Do you want to delete your profile?')) {
      return;
    }

    axios
      .delete(`${process.env.REACT_APP_API_HOST}/users`, {
        headers: getHeaders(),
      })
      .then(() => {
        localStorage.removeItem('user');
        window.location.href = '/';
      })
      .catch(() => {
        notificationContext.setMessage('Error deleting profile.', 'error');
      });
  }

  function onEnter(e) {
    if (e.key === 'Enter') onUpdate();
  }

  return (
    <div className="main-content">
      <Card className="profile">
        <CardContent>
          <br />
          <Typography variant="h6">Profile</Typography>
          {userContext.state.user.name ? (
            <div>
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                defaultValue={userContext.state.user.name}
                onKeyPress={onEnter}
                onChange={e => (newName = e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                onKeyPress={onEnter}
                onChange={e => (newPassword = e.target.value)}
              />
              <TextField
                fullWidth
                label="Confirm password"
                margin="normal"
                type="password"
                onKeyPress={onEnter}
                onChange={e => (newConfirmPassword = e.target.value)}
              />
            </div>
          ) : (
            <Loading header="Profile" />
          )}
          <Grid justify="space-between" container>
            <Button onClick={onUpdate} variant="contained" color="primary">
              Update
            </Button>

            <Button onClick={onDelete} variant="contained" color="secondary">
              Delete profile
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
