import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loading from './Loading';
import ImageSlider from './ImageSlider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';

export default function Recipe(props) {
  const header = 'Recipe';
  const id = parseInt(props.match.params.id, 10);
  const [state, setState] = useState({
    id: id,
    data: {},
    loading: true,
    error: false,
  });
  let unmounted = false;

  useEffect(() => {
    requestData();
    return function() {
      unmounted = true;
    };
  }, []);

  function onSuccess(data) {
    if (unmounted) return;
    setState({
      id: id,
      data: data,
      loading: false,
      error: false,
    });
  }

  function onError() {
    if (unmounted) return;
    setState({
      loading: false,
      error: true,
    });
  }

  async function requestData() {
    try {
      const url = `${process.env.REACT_APP_API_HOST}/recipes/${id}.json`;
      const response = await axios.get(url);
      onSuccess(response.data);
    } catch (e) {
      onError();
    }
  }

  function createMarkup() {
    return {__html: state.data.description};
  }

  const {data, loading, error} = state;

  if (loading && !data.id) {
    return <Loading header={header} />;
  }

  if (error) {
    return (
      <div>
        <h1>{header}</h1>
        <p>Error loading recipe.</p>
      </div>
    );
  }
  return (
    <Card className="recipe">
      <div className="card-images">
        <ImageSlider images={data.images} />
      </div>
      <div className="card-info">
        <div className="card-text">
          <Typography variant="h6" color="inherit" className="cart-name">
            {data.name}
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={createMarkup()}
          />

          <Typography variant="button" display="block" gutterBottom>
            {data.category.name}
          </Typography>

          <ul>
            <div className="card-tags">
              {data.tags.map(tag => (
                <Chip
                  key={`card-tag-${tag.id}`}
                  className="card-tag"
                  label={tag.name}
                />
              ))}
            </div>
          </ul>
          <br />
          <ul>
            {data.ingredients.map(function(ingredient) {
              return (
                <li key={`ingredient-${ingredient.id}`}>
                  <Typography variant="body1" gutterBottom>
                    {`${ingredient.name} ${ingredient.amount} ${
                      ingredient.measurement
                    }`}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Card>
  );
}
