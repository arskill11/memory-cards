import { GiCardJoker } from 'react-icons/gi';
import { VscDebugRestart } from 'react-icons/vsc';
import './styles.css';

interface Props {
  count: number;
  setChosenPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<Props> = ({ count, setChosenPokemons, setCount }) => {
  function handleClick() {
    setCount(0);
    setChosenPokemons([]);
  }
  return (
    <header className="header">
      <div className="header__name">
        <GiCardJoker className="header__name--logo" />
        <h1 className="header__name--text">Memory Cards</h1>
      </div>
      <div className="header__count">
        <p className="header__count--text">{count} / 20</p>
        <button className="header__count--button" onClick={handleClick}>
          <VscDebugRestart />
        </button>
      </div>
    </header>
  );
};

export default Header;
