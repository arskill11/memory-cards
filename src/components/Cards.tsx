import { useEffect, useState } from 'react';
import Card from './Card';

interface Pokemon {
  name: string;
  url: string;
  isFlipped: boolean;
}

interface Props {
  count: number;
  chosenPokemons: string[];
  isLost: boolean;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setChosenPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLost: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cards: React.FC<Props> = ({
  count,
  setCount,
  chosenPokemons,
  setChosenPokemons,
  setIsLost,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        const shuffledPokemons = shuffleArray(data.results).slice(0, 20);

        const pokemonUrlsPromises = shuffledPokemons.map(async (pokemon) => {
          const urlResponse = await fetch(pokemon.url);
          const urlData = await urlResponse.json();
          return {
            name: pokemon.name,
            url: urlData.sprites.front_default,
            isFlipped: false,
          };
        });

        const pokemonDetails = await Promise.all(pokemonUrlsPromises);
        setPokemons(pokemonDetails);
      } catch (err) {
        console.error('Something went wrong', err);
      }
    }

    fetchData();
  }, []);

  const handleCardFlip = () => {
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) => ({
        ...pokemon,
        isFlipped: true,
      })),
    );

    setTimeout(() => {
      setPokemons((prevPokemons) => {
        const shuffledPokemons = shuffleArray(prevPokemons);
        return shuffledPokemons.map((pokemon) => ({
          ...pokemon,
          isFlipped: false,
        }));
      });
    }, 1000);
  };

  function shuffleArray(array: Pokemon[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  return (
    <div className="cards">
      {pokemons.map((poke) => (
        <Card
          pokemon={poke}
          key={poke.name}
          setFlipped={handleCardFlip}
          chosenPokemons={chosenPokemons}
          setChosenPokemons={setChosenPokemons}
          count={count}
          setCount={setCount}
          setIsLost={setIsLost}
        />
      ))}
    </div>
  );
};

export default Cards;
