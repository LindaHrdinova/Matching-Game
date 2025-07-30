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

const getInitialLeastAttempts = (): number | null => {
  const stored = localStorage.getItem('leastAttempts');
  //console.log('stored ' + stored);

  return stored === null ? null : Number(stored);
};

const App = () => {
  const [numOfPlayers, setNumberOfPlayers] = useState<number>(
    getInitialNumOfPlayer,
  );
  const [appLanguage, setAppLanguage] = useState<string>(getInitialLanguage);
  const [leastAttempts, setLeastAttempts] = useState<number | null>(
    getInitialLeastAttempts,
  );

  useEffect(() => {
    document.documentElement.lang = appLanguage;
    localStorage.setItem('language', appLanguage);
  }, [appLanguage]);

  useEffect(() => {
    localStorage.setItem('numOfPlayer', String(numOfPlayers));
  }, [numOfPlayers]);

  useEffect(() => {
    if (leastAttempts !== null) {
      localStorage.setItem('leastAttempts', String(leastAttempts));
    }
    //console.log('useEffect ' + leastAttempts);
  }, [leastAttempts]);

  //const stored = localStorage.getItem('leastAttempts');
  //console.log('app.tsx ' + stored);

  return (
    <>
      <Option
        appLanguage={appLanguage}
        numOfPlayers={numOfPlayers}
        onSetNumberOfPlayers={setNumberOfPlayers}
        onSetAppLanguage={setAppLanguage}
      />
      <GameTable
        appLanguage={appLanguage}
        numOfPlayers={numOfPlayers}
        leastAttempts={leastAttempts}
        onSetLeastAttempts={setLeastAttempts}
      />
    </>
  );
};

export default App;
