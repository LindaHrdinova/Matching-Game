import './App.css';
import { GameTable } from './components/gameTable/GameTable';
import { Option } from './components/Option/Option';
import { useState } from 'react';

const App = () => {
  const [numOfPlayers, setNumberOfPlayers] = useState<number>(1);
  const [appLanguage, setAppLanguage] = useState<string>('en');

  return (
    <>
      <Option
        onSetNumberOfPlayers={setNumberOfPlayers}
        onSetAppLanguage={setAppLanguage}
      />
      {console.log(numOfPlayers, appLanguage)}
      <GameTable numOfPlayers={numOfPlayers} />
    </>
  );
};

export default App;
