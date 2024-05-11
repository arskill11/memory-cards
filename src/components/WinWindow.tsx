import { VscDebugRestart } from 'react-icons/vsc';
import './styles.css';

interface Props {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setChosenPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLost: React.Dispatch<React.SetStateAction<boolean>>;
}

const WinWindow: React.FC<Props> = ({
  setCount,
  setChosenPokemons,
  setIsLost,
}) => {
  function handleClick() {
    setCount(0);
    setChosenPokemons([]);
    setIsLost(false);
  }

  return (
    <div className="loseWindow">
      <p className="loseWindow--text">You are a winner!</p>
      <button className="loseWindow--button" onClick={handleClick}>
        <VscDebugRestart />
      </button>
    </div>
  );
};

export default WinWindow;
