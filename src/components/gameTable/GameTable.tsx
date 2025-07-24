import './style.css';
import { Cards } from '../Cards/Cards';
import { cardList as originalCardList } from '../../data/cardsData';
import { useState, useEffect } from 'react';
import { Players } from '../Players/Players';

import cs from '../../texts/cs';
import en from '../../texts/en';

const fisherYatesShuffle = (list: typeof originalCardList) => {
  const newList = [...list];
  for (let i = newList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newList[i], newList[j]] = [newList[j], newList[i]];
  }
  return newList;
};

interface GameTableProp {
  appLanguage: string;
  numOfPlayers: number;
}

export const GameTable: React.FC<GameTableProp> = ({
  appLanguage,
  numOfPlayers,
}) => {
  const [pairsFound, setPairsFound] = useState<number>(0);
  const [isBoardLocked, setIsBoardLocked] = useState<boolean>(false);
  const [cardList, setCardList] = useState(() => {
    return fisherYatesShuffle(originalCardList);
  });
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(cardList.length).fill(false),
  );
  const [showRestartButton, setShowRestartButton] = useState<boolean>(false);
  const [attempCounter, setAttemptCounter] = useState<number>(0);
  const [player1Points, setPlayer1Points] = useState<number>(0);
  const [player2Points, setPlayer2Points] = useState<number>(0);
  const [activePlayer1, setActivePlayer1] = useState<boolean>(true);

  const texts = appLanguage === 'en' ? en : cs;

  useEffect(() => {
    setFlippedCards(Array(cardList.length).fill(false));
  }, [cardList]);

  useEffect(() => {
    if (pairsFound === cardList.length / 2) {
      const timeOutRestartButton = setTimeout(() => {
        setShowRestartButton(true);
      }, 600);
      return () => clearTimeout(timeOutRestartButton);
    }
  }, [pairsFound, cardList.length]);

  const RestartButton = () => (
    <button className="game--btnRestartGame" onClick={handleRestartGame}>
      {texts.newGame}
    </button>
  );

  const handleRestartGame = () => {
    setIsBoardLocked(true);
    setFlippedCards(Array(cardList.length).fill(false));
    setPairsFound(0);
    setAttemptCounter(0);
    setPlayer1Points(0);
    setPlayer2Points(0);
    setActivePlayer1(true);
    setShowRestartButton(false);
    setTimeout(() => {
      setCardList(fisherYatesShuffle(originalCardList));
      setIsBoardLocked(false);
    }, 700);
  };

  return (
    <div className="game">
      <Players
        appLanguage={appLanguage}
        numOfPlayers={numOfPlayers}
        attempCounter={attempCounter}
        player1Points={player1Points}
        player2Points={player2Points}
        activePlayer1={activePlayer1}
      />

      <div className="gameTable">
        <Cards
          pairsFound={pairsFound}
          cardList={cardList}
          isBoardLocked={isBoardLocked}
          flippedCards={flippedCards}
          attempCounter={attempCounter}
          player1Points={player1Points}
          player2Points={player2Points}
          activePlayer1={activePlayer1}
          onSetPairsFound={setPairsFound}
          onSetFlippedCards={setFlippedCards}
          onSetIsBoardLocked={setIsBoardLocked}
          onSetAttemptCounter={setAttemptCounter}
          onSetPlayer1Points={setPlayer1Points}
          onSetPlayer2Points={setPlayer2Points}
          onSetActivePlayer1={setActivePlayer1}
        />
      </div>
      {showRestartButton ? <RestartButton /> : null}
    </div>
  );
};
