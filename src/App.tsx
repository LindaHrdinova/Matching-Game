import './App.css';
import { GameTable } from './components/gameTable/GameTable';
import { Option } from './components/Option/Option';
import { useState, useEffect } from 'react';

const getInitialLanguage = (): string => {
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === 'cs' ? 'cs' : 'en';
};

const App = () => {
  const [numOfPlayers, setNumberOfPlayers] = useState<number>(1);
  const [appLanguage, setAppLanguage] = useState<string>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = appLanguage;
  }, [appLanguage]);

  return (
    <>
      <Option
        appLanguage={appLanguage}
        onSetNumberOfPlayers={setNumberOfPlayers}
        onSetAppLanguage={setAppLanguage}
      />
      <GameTable appLanguage={appLanguage} numOfPlayers={numOfPlayers} />
    </>
  );
};

export default App;
