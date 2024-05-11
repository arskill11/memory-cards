import './styles.css';
import Pokemon from '../types';

interface Props {
  pokemon: Pokemon;
  chosenPokemons: string[];
  count: number;
  setIsFlipped: () => void;
  setChosenPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setIsLost: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<Props> = ({
  setIsFlipped,
  pokemon,
  chosenPokemons,
  setChosenPokemons,
  count,
  setCount,
  setIsLost,
}) => {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    let pokemonRepetition = false;
    const btnElement = e.currentTarget;
    const id = btnElement.getAttribute('id');
    console.log(id);
    chosenPokemons.map((pokemon) => {
      if (id && pokemon === id) {
        setIsLost(true);
        pokemonRepetition = true;
      }
    });

    if (!pokemonRepetition && id) {
      setChosenPokemons([...chosenPokemons, id]);
      setCount(count + 1);
      setIsFlipped();
    }
  }

  return (
    <button
      className={`card ${pokemon.isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
      id={pokemon.name}
      disabled={pokemon.isDisabled}
    >
      <img
        src={pokemon.url}
        alt=""
        className="card--pokeLogo"
        onClick={(e) => e.preventDefault()}
      />
      <h4 className="card--pokeName">{pokemon.name}</h4>
    </button>
  );
};

export default Card;
