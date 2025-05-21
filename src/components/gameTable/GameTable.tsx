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
  const [pairsFound, setPairsFound] = useState<number>(10);
  const [isBoardLocked, setIsBoardLocked] = useState<boolean>(false);
  const [cardList, setCardList] = useState(() => {
    return fisherYatesShuffle(originalCardList);
  });
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(cardList.length).fill(false),
  );

  useEffect(() => {
    setFlippedCards(Array(cardList.length).fill(false));
  }, [cardList]);

  const handleRestartGame = () => {
    setIsBoardLocked(true);
    setFlippedCards(Array(cardList.length).fill(false));
    setPairsFound(0);
    setTimeout(() => {
      setCardList(fisherYatesShuffle(originalCardList));
      setIsBoardLocked(false);
    }, 700);
  };

  return (
    <div className="game">
      <h1>Matching game</h1>
      <div className="gameTable">
        <Cards
          pairsFound={pairsFound}
          cardList={cardList}
          isBoardLocked={isBoardLocked}
          flippedCards={flippedCards}
          onSetPairsFound={setPairsFound}
          onSetFlippedCards={setFlippedCards}
          onSetIsBoardLocked={setIsBoardLocked}
        />
      </div>
      {pairsFound === cardList.length / 2 ? (
        <button className="game--btnRestartGame" onClick={handleRestartGame}>
          nová hra
        </button>
      ) : null}
    </div>
  );
};
