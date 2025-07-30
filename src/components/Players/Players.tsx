import './style.css';
import { PlayersOne } from '../PlayersOne/PlayersOne';
import { PlayersTwo } from '../PlayersTwo/PlayersTwo';

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
  return (
    <>
      {numOfPlayers === 1 ? (
        <PlayersOne appLanguage={appLanguage} attempCounter={attempCounter} />
      ) : (
        <>
          <PlayersTwo
            appLanguage={appLanguage}
            player1Points={player1Points}
            player2Points={player2Points}
            activePlayer1={activePlayer1}
          />
        </>
      )}
    </>
  );
};
