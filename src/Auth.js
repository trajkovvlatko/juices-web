import React, {useContext, useState} from 'react';
import axios from 'axios';
import './styles/Auth.css';

import UserContext from './contexts/user-context';
import NotificationContext from './contexts/notification-context';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ProfileForm from './ProfileForm';
import Button from '@material-ui/core/Button';

import {getHeaders} from './helpers';

export default function Auth() {
  const userContext = useContext(UserContext);
  const notificationContext = useContext(NotificationContext);
  const [forms, setForms] = useState({});

  if (!userContext.state.requested) {
    getCurrentUser();
  }

  async function getCurrentUser() {
    const url = `${process.env.REACT_APP_API_HOST}/current_user.json`;
    try {
      const authResponse = await axios.get(url, {headers: getHeaders()});
      userContext.setUser(authResponse.data);
    } catch (e) {
      console.log('Not logged in');
    }
    userContext.setRequested(true);
  }

  function onSignIn() {
    setForms({ openSignInForm: !forms.openSignInForm })
  }

  function onSignUp() {
    setForms({ openSignUpForm: !forms.openSignUpForm })
  }

  function signIn(email, password) {
    sendRequest('/users/sign_in', email, password);
  }

  function signUp(email, password, name) {
    sendRequest('/users', email, password, name);
  }

  function sendRequest(endpoint, email, password, name = '') {
    let data = {
      email: email,
      password: password,
    };
    if (name) {
      data.name = name;
    }
    axios
      .post(`${process.env.REACT_APP_API_HOST}${endpoint}`, data)
      .then(response => {
        const headers = response.headers;
        localStorage.setItem(
          'user',
          JSON.stringify({
            accessToken: headers['access-token'],
            client: headers['client'],
            uid: headers['uid'],
          }),
        );
        userContext.setUser(response.data);
        userContext.scheduleReload();
        setForms({});
      })
      .catch(error => {
        const message = error.response.data.errors.full_messages
          ? error.response.data.errors.full_messages.join('\r\n')
          : error.response.data.errors.join('\r\n');
        notificationContext.setMessage(message, 'error');
      });
  }

  function onSignOut() {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/users/sign_out`, {
        headers: getHeaders(),
      })
      .then(response => {
        localStorage.removeItem('user');
        window.location.href = '/';
      });
  }

  function onProfile() {
    setForms({ openProfileForm: !forms.openProfileForm })
  }

  if (userContext.state.user.name) {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={onProfile}>
          Profile
        </Button>
        <ProfileForm
          active={forms.openProfileForm}
          name={userContext.state.user.name}
          onSignOut={onSignOut}
          onClick={onProfile}
        />
      </div>
    );
  }
  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={onSignUp}>
        Sign up
      </Button>
      &nbsp;
      <Button variant="contained" color="secondary" onClick={onSignIn}>
        Sign in
      </Button>
      <SignInForm active={forms.openSignInForm} signIn={signIn} />
      <SignUpForm active={forms.openSignUpForm} signUp={signUp} />
    </div>
  );
}
