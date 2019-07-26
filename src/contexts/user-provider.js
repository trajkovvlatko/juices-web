import React, {Component} from 'react';
import UserContext from './user-context';

export default class UserProvider extends Component {
  state = {
    shouldReload: false,
    user: {},
  };
  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          setUser: data => {
            this.setState(() => {
              return { user: data };
            });
          },
          setRequested: () => {
            this.setState(() => {
              return { requested: true };
            });
          },
          scheduleReload: () => {
            this.setState(() => {
              return { shouldReload: true };
            });
          },
          unscheduleReload: () => {
            this.setState(() => {
              return { shouldReload: false };
            });
          },
        }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
