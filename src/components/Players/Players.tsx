import './style.css';
import cs from '../../texts/cs';
import en from '../../texts/en';

interface playerProp {
  appLanguage: string;
  attempCounter: number;
  numOfPlayers: number;
  player1Points: number;
  player2Points: number;
  activePlayer1: boolean;
}

export const Players: React.FC<playerProp> = ({
  appLanguage,
  attempCounter,
  numOfPlayers,
  player1Points,
  player2Points,
  activePlayer1,
}) => {
  const texts = appLanguage === 'en' ? en : cs;

  return (
    <>
      {numOfPlayers === 1 ? (
        <p className="game__attempCounter">
          {texts.attempts}: {attempCounter}
        </p>
      ) : (
        <>
          <p className="game__attempCounter">
            <span
              className={activePlayer1 ? 'player player--active' : 'player'}
            >
              {texts.player} 1
            </span>{' '}
            {texts.pairsFound}: {player1Points} |{' '}
            <span
              className={activePlayer1 ? 'player' : 'player player--active'}
            >
              {texts.player} 2
            </span>{' '}
            {texts.pairsFound}: {player2Points}
          </p>
        </>
      )}
    </>
  );
};
