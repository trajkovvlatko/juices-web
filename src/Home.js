import React, {useContext} from 'react';
import MainContent from './MainContent';
import UserContext from './contexts/user-context';

export default function Home(props) {
  const userContext = useContext(UserContext);

  return (
    <div className="main-content">
      <MainContent
        favorites={props.favorites}
        unscheduleReload={userContext.unscheduleReload.bind(userContext)}
        shouldReload={userContext.state.shouldReload}
      />
    </div>
  );
}
