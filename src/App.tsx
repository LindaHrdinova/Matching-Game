import './App.css';
import { GameTable } from './components/gameTable/GameTable';
import { Option } from './components/Option/Option';
import { useState, useEffect } from 'react';

const getInitialLanguage = (): string => {
  const stored = localStorage.getItem('language');
  if (stored === 'cs' || stored === 'en') return stored;

  const browserLang = navigator.language.slice(0, 2);
  return browserLang === 'cs' ? 'cs' : 'en';
};

const getInitialNumOfPlayer = (): number => {
  const stored = localStorage.getItem('numOfPlayer');
  return stored === '2' ? 2 : 1;
};

const App = () => {
  const [numOfPlayers, setNumberOfPlayers] = useState<number>(
    getInitialNumOfPlayer,
  );
  const [appLanguage, setAppLanguage] = useState<string>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = appLanguage;
    localStorage.setItem('language', appLanguage);
  }, [appLanguage]);

  useEffect(() => {
    localStorage.setItem('numOfPlayer', String(numOfPlayers));
  }, [numOfPlayers]);

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
