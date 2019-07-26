import React, {Component} from 'react';
import NotificationContext from './notification-context';

export default class NotificationProvider extends Component {
  state = {message: '', type: ''};
  render() {
    return (
      <NotificationContext.Provider
        value={{
          state: this.state,
          setMessage: (message, type) => {
            this.setState(() => {
              return {
                message: message,
                type: type,
              };
            });
          },
          scheduleRemove: () => {
            setTimeout(() => {
              this.setState(() => {
                return {
                  message: null,
                  type: '',
                };
              });
            }, 3000);
          },
        }}>
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}
