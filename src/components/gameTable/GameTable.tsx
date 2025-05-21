import '../../App.css';
import { Cards } from '../Cards/Cards';

export const GameTable: React.FC = () => {
  return (
    <div className="game">
      <h1>Matching game</h1>
      <div className="gameTable">
        <Cards />
      </div>
    </div>
  );
};
