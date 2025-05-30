import './style.css';
import { Cards } from '../Cards/Cards';
import { cardList as originalCardList } from '../../data/cardsData';
import { useState, useEffect } from 'react';

const fisherYatesShuffle = (list: typeof originalCardList) => {
  const newList = [...list];
  for (let i = newList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newList[i], newList[j]] = [newList[j], newList[i]];
  }
  return newList;
};

export const GameTable: React.FC = () => {
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
      new game
    </button>
  );

  const handleRestartGame = () => {
    setIsBoardLocked(true);
    setFlippedCards(Array(cardList.length).fill(false));
    setPairsFound(0);
    setAttemptCounter(0);
    setShowRestartButton(false);
    setTimeout(() => {
      setCardList(fisherYatesShuffle(originalCardList));
      setIsBoardLocked(false);
    }, 700);
  };

  return (
    <div className="game">
      <h1>Matching game</h1>
      <p className="game__attempCounter">Attempts: {attempCounter}</p>
      <div className="gameTable">
        <Cards
          pairsFound={pairsFound}
          cardList={cardList}
          isBoardLocked={isBoardLocked}
          flippedCards={flippedCards}
          attempCounter={attempCounter}
          onSetPairsFound={setPairsFound}
          onSetFlippedCards={setFlippedCards}
          onSetIsBoardLocked={setIsBoardLocked}
          onSetAttemptCounter={setAttemptCounter}
        />
      </div>
      {showRestartButton ? <RestartButton /> : null}
    </div>
  );
};
