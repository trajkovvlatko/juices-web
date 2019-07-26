import React from 'react';

export default function Loading(props) {
  return (
    <div>
      <div className="loading">
        Loading <b>{props.header}</b>, please wait...
      </div>
    </div>
  );
}
