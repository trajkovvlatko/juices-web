import React from 'react';
import {Link} from 'react-router-dom';
import Like from './Like';
import Share from './Share';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import './styles/Card.css';

export default function CardItem(props) {
  const {data} = props;
  const route = `/recipes/${data.id}`;
  const markup = {__html: data.description};

  return (
    <li className="card">
      <Card>
        <Link
          key={`read-more-${data.id}`}
          className="card-read-more"
          to={{pathname: route, state: {modal: true}}}>
          <CardHeader
            avatar={<Avatar aria-label="Recipe">{data.name[0]}</Avatar>}
            title={data.name}
            subheader={data.created_at}
          />
          <CardMedia
            className="card-image"
            image={data.image}
            title={data.name}
          />
        </Link>
        <CardContent>
          <Typography component="p" dangerouslySetInnerHTML={markup} />

          <div className="card-tags">
            {data.tags.map(tag => (
              <Chip
                key={`card-tag-${tag.id}`}
                className="card-tag"
                label={tag.name}
              />
            ))}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          {data.with_user && <Like likeId={data.like_id} recipeId={data.id} />}
          <Share id={data.id} />
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className="card-read-more">
            <Link
              key={`read-more-${data.id}`}
              className="card-read-more"
              to={{pathname: route, state: {modal: true}}}>
              Read more
            </Link>
          </Button>
        </CardActions>
      </Card>
    </li>
  );
}
