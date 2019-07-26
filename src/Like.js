import React, {useContext, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import {getHeaders} from './helpers';
import NotificationContext from './contexts/notification-context';

export default function Like(props) {
  const notificationContext = useContext(NotificationContext);
  const [defaults, setDefaults] = useState({
    id: props.likeId,
    recipeId: props.recipeId,
  });

  async function onClick() {
    const headers = getHeaders();
    if (defaults.id) {
      const url = `${process.env.REACT_APP_API_HOST}/likes/${defaults.id}.json`;
      await axios
        .delete(
          url,
          {
            headers: headers,
          },
          {
            recipe_id: props.recipeId,
          },
        )
        .then(resp => {
          setDefaults({id: null, recipeId: props.recipeId});
        })
        .catch(e => {
          notificationContext.setMessage('Error removing like.', 'error');
        });
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_HOST}/likes.json`,
          {
            like: {recipe_id: defaults.recipeId},
          },
          {
            headers: headers,
          },
        )
        .then(resp => {
          setDefaults({id: resp.data.id, recipeId: props.recipeId});
        })
        .catch(e => {
          notificationContext.setMessage('Error saving like.', 'error');
        });
    }
  }

  return (
    <div>
      <IconButton
        aria-label="Add to favorites"
        onClick={onClick}
        color={(defaults.id && 'secondary') || 'default'}>
        <FavoriteIcon />
      </IconButton>
    </div>
  );
}
