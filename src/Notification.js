import React, {useContext} from 'react';
import NotificationContext from './contexts/notification-context';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function Notification() {
  const notificationContext = useContext(NotificationContext);
  const {message, type} = notificationContext.state;
  if (message) {
    notificationContext.scheduleRemove();
  } else {
    return '';
  }

  return (
    <SnackbarContent
      className={`message ${type} ${message ? '' : 'hidden'}`}
      message={
        <span>
          <CheckCircleIcon />
          {message}
        </span>
      }
    />
  );
}
