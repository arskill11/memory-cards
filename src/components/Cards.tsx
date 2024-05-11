import { useEffect, useState } from 'react';
import shuffleArray from '../utils';
import Pokemon from '../types';
import Card from './Card';

interface Props {
  count: number;
  chosenPokemons: string[];
  isLost: boolean;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setChosenPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLost: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_POKEMON_COUNT = 20;

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
        const shuffledPokemons = shuffleArray(data.results).slice(
          0,
          MAX_POKEMON_COUNT,
        );

        const pokemonUrlsPromises = shuffledPokemons.map(async (pokemon) => {
          const urlResponse = await fetch(pokemon.url);
          const urlData = await urlResponse.json();
          return {
            name: pokemon.name,
            url: urlData.sprites.front_default,
            isFlipped: false,
            isDisabled: false,
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
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.removeEventListener('click', handleCardFlip);
    });
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) => ({
        ...pokemon,
        isFlipped: true,
        isDisabled: true,
      })),
    );

    setTimeout(() => {
      setPokemons((prevPokemons) => {
        const shuffledPokemons = shuffleArray(prevPokemons);
        return shuffledPokemons.map((pokemon) => ({
          ...pokemon,
          isFlipped: false,
          isDisabled: false,
        }));
      });
    }, 1000);
  };

  return (
    <div className="cards">
      {pokemons.map((pokemon) => (
        <Card
          pokemon={pokemon}
          key={pokemon.name}
          setIsFlipped={handleCardFlip}
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
