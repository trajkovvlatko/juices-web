import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Favorites from './Favorites';
import Recipe from './Recipe';
import Modal from './Modal';
import Profile from './Profile';
import Notification from './Notification';
import UserProvider from './contexts/user-provider';
import NotificationProvider from './contexts/notification-provider';

export default class ModalSwitch extends React.Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    let {location} = this.props;

    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    let {location} = this.props;

    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render

    return (
      <UserProvider>
        <NotificationProvider>
          <div>
            <Header />
            <Notification />
          </div>
          <div>
            <Switch location={isModal ? this.previousLocation : location}>
              <Route exact path="/" component={Home} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/profile" component={Profile} />
              <Route path="/recipes/:id" component={Recipe} />
            </Switch>
            {isModal ? <Route path="/recipes/:id" component={Modal} /> : null}
          </div>
        </NotificationProvider>
      </UserProvider>
    );
  }
}
