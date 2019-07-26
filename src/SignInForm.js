import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

let email, password;

export default function SignInForm(props) {
  function onClick() {
    if (!email || !password) {
      return;
    }
    props.signIn(email, password);
  }

  function onEnter(e) {
    if (e.key === 'Enter') onClick();
  }

  return (
    <div className={`sign-in-form ${props.active ? '' : 'inactive'}`}>
      <br />
      <Typography variant="h6" color="primary">
        Sign In
      </Typography>
      <div>
        <TextField
          fullWidth
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
      <br />
      <Button onClick={onClick} variant="contained" color="primary">
        Sign in
      </Button>
    </div>
  );
}
