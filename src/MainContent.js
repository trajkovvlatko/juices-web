import React, {Component} from 'react';
import axios from 'axios';

import CardsList from './CardsList';
import Loading from './Loading';
import {getHeaders} from './helpers';
import Typography from '@material-ui/core/Typography';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.header = 'Recipes';
    this.state = {
      data: [],
      loading: true,
      limit: 10,
      page: 1,
      error: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldReload) {
      this.setState(
        () => {
          return {
            data: [],
            page: 1,
            loading: true,
          };
        },
        () => {
          nextProps.unscheduleReload();
          this.requestData();
        },
      );
    }
  }

  componentDidMount() {
    this.requestData();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    this.unmounted = true;
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    if (this.unmounted) return;
    const {loading} = this.state;
    if (loading) return;
    if (
      window.innerHeight + window.scrollY + 10 >=
      document.body.offsetHeight
    ) {
      this.setState(
        () => {
          return {loading: true};
        },
        () => {
          this.requestData();
        },
      );
    }
  }

  onEmpty() {
    if (this.unmounted) return;
    this.setState(() => {
      return {error: false, loading: false};
    });
  }

  onSuccess(newData) {
    if (this.unmounted) return;
    const {page, data} = this.state;
    const scope = this;
    this.setState(() => {
      return {
        data: page === 1 ? newData : [...data, ...newData],
        error: false,
        page: page + 1,
      };
    });
    setTimeout(function() {
      scope.setState(() => {
        return {loading: false};
      });
    }, 1000);
  }

  onError() {
    if (this.unmounted) return;
    this.setState(() => {
      return {loading: false, error: true};
    });
  }

  async requestData() {
    const {limit, page} = this.state;
    const params = [`per_page=${limit}`, `page=${page}`].join('&');
    const endpoint = this.props.favorites ? 'favorites' : 'recipes';
    const url = `${process.env.REACT_APP_API_HOST}/${endpoint}.json?${params}`;
    try {
      const response = await axios.get(url, {headers: getHeaders()});
      if (response.data.length === 0) {
        return this.onEmpty();
      }
      return this.onSuccess(response.data);
    } catch (error) {
      this.onError();
    }
  }

  render() {
    const {data, loading, error} = this.state;
    if (loading && data.length === 0) {
      return <Loading header={this.header} />;
    }
    if (!loading && data.length === 0) {
      return <Typography variant="h6">No recipes found.</Typography>;
    }
    return (
      <div>
        <CardsList data={data} />
        {error && <p>Error loading recipes.</p>}
      </div>
    );
  }
}
