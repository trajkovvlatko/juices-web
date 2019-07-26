import React from 'react';
import CardItem from './CardItem';

export default function CardsList(props) {
  return (
    <ul className="cards-list">
      {props.data.map(function(item) {
        return <CardItem key={`card-item-${item.id}`} data={item} />;
      })}
    </ul>
  );
}
