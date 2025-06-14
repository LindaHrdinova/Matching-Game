import './App.css';
import { GameTable } from './components/gameTable/GameTable';
import { Option } from './components/Option/Option';
import { useState, useEffect } from 'react';

const App = () => {
  const [numOfPlayers, setNumberOfPlayers] = useState<number>(1);
  const [appLanguage, setAppLanguage] = useState<string>('en');

  console.log(appLanguage);

  return (
    <>
      <Option
        onSetNumberOfPlayers={setNumberOfPlayers}
        onSetAppLanguage={setAppLanguage}
      />
      <GameTable numOfPlayers={numOfPlayers} />
    </>
  );
};

export default App;
