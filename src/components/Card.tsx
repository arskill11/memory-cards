import './styles.css';

interface Pokemon {
  name: string;
  url: string;
  isFlipped: boolean;
}

interface Props {
  pokemon: Pokemon;
  chosenPokemons: string[];
  count: number;
  setFlipped: () => void;
  setChosenPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setIsLost: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<Props> = ({
  setFlipped,
  pokemon,
  chosenPokemons,
  setChosenPokemons,
  count,
  setCount,
  setIsLost,
}) => {
  let ik = false;
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const divElement = e.currentTarget;
    const id = divElement.getAttribute('id');
    chosenPokemons.map((poke) => {
      if (id && poke === id) {
        setIsLost(true);
        ik = true;
      }
    });

    if (!ik && id) {
      setChosenPokemons([...chosenPokemons, id]);
      setCount(count + 1);
      setFlipped();
    }
  }

  return (
    <div
      className={`card ${pokemon.isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
      id={pokemon.name}
    >
      <img
        src={pokemon.url}
        alt=""
        className="card--pokeLogo"
        onClick={(e) => e.preventDefault()}
      />
      <h4 className="card--pokeName">{pokemon.name}</h4>
    </div>
  );
};

export default Card;
