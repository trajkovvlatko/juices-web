import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NotificationContext from './contexts/notification-context';

let name, email, password, confirmPassword;

export default function SignUpForm(props) {
  const notificationContext = useContext(NotificationContext);

  function onClick() {
    if (!name || !email || !password || !confirmPassword) {
      return;
    }

    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      notificationContext.setMessage('Invalid email address.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      notificationContext.setMessage("Passwords don't match.", 'error');
      return;
    }

    if (password.length < 8) {
      notificationContext.setMessage(
        'Password too short. (min 8 characters required.',
        'error',
      );
      return;
    }

    props.signUp(email, password, name);
  }

  function onEnter(e) {
    if (e.key === 'Enter') onClick();
  }

  return (
    <div className={`sign-up-form ${props.active ? '' : 'inactive'}`}>
      <br />
      <Typography variant="h6" color="primary">
        Sign up
      </Typography>
      <div>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          onKeyPress={onEnter}
          onChange={e => (name = e.target.value)}
          inputProps={{autoCapitalize: 'none'}}
        />
      </div>
      <div>
        <TextField
          fullWidth
          type="email"
          label="Email"
          margin="normal"
          onKeyPress={onEnter}
          onChange={e => (email = e.target.value)}
          inputProps={{autoCapitalize: 'none'}}
        />
      </div>
      <div>
        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          onKeyPress={onEnter}
          onChange={e => (password = e.target.value)}
          inputProps={{autoCapitalize: 'none'}}
        />
      </div>
      <div>
        <TextField
          fullWidth
          type="password"
          label="Confirm password"
          margin="normal"
          onKeyPress={onEnter}
          onChange={e => (confirmPassword = e.target.value)}
          inputProps={{autoCapitalize: 'none'}}
        />
      </div>
      <br />
      <Button onClick={onClick} variant="contained" color="primary">
        Sign up
      </Button>
    </div>
  );
}
