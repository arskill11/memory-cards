import { VscDebugRestart } from 'react-icons/vsc';
import './styles.css';

interface Props {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setChosenPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLost: React.Dispatch<React.SetStateAction<boolean>>;
  count: number;
}

const LoseWindow: React.FC<Props> = ({
  setCount,
  setChosenPokemons,
  setIsLost,
  count,
}) => {
  function handleClick() {
    setCount(0);
    setChosenPokemons([]);
    setIsLost(false);
  }

  return (
    <div className="loseWindow">
      <p className="loseWindow--text">
        We're sorry but it seems like you lost. Your result is {count}
      </p>
      <button className="loseWindow--button" onClick={handleClick}>
        <VscDebugRestart />
      </button>
    </div>
  );
};

export default LoseWindow;
