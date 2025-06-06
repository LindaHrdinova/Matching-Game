import './style.css';

interface playerProp {
  attempCounter: number;
  numOfPlayers: number;
  player1Points: number;
  player2Points: number;
  activePlayer1: boolean;
}

export const Players: React.FC<playerProp> = ({
  attempCounter,
  numOfPlayers,
  player1Points,
  player2Points,
  activePlayer1,
}) => {
  return (
    <>
      {numOfPlayers === 1 ? (
        <p className="game__attempCounter">Attempts: {attempCounter}</p>
      ) : (
        <>
          <p className="game__attempCounter">
            <span
              className={activePlayer1 ? 'player player--active' : 'player'}
            >
              Player 1
            </span>{' '}
            pairs found: {player1Points} |{' '}
            <span
              className={activePlayer1 ? 'player' : 'player player--active'}
            >
              Player 2{' '}
            </span>{' '}
            pairs found: {player2Points}
          </p>
        </>
      )}
    </>
  );
};
