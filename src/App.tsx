import Header from './components/Header';
import AboutGame from './components/AboutGame';
import Cards from './components/Cards';
import { useState } from 'react';
import LoseWindow from './components/LoseWindow';
import './App.css';
import WinWindow from './components/WinWindow';

function App() {
  const [guessedCount, setGuessedCount] = useState<number>(0);
  const [chosenPokemons, setChosenPokemons] = useState<string[]>([]);
  const [isLost, setIsLost] = useState<boolean>(false);

  return (
    <>
      <Header
        count={guessedCount}
        setChosenPokemons={setChosenPokemons}
        setCount={setGuessedCount}
      />
      {isLost ? (
        <LoseWindow
          setCount={setGuessedCount}
          setChosenPokemons={setChosenPokemons}
          setIsLost={setIsLost}
          count={guessedCount}
        />
      ) : guessedCount === 20 ? (
        <WinWindow
          setCount={setGuessedCount}
          setChosenPokemons={setChosenPokemons}
          setIsLost={setIsLost}
        />
      ) : (
        <>
          <AboutGame />
          <Cards
            count={guessedCount}
            setCount={setGuessedCount}
            chosenPokemons={chosenPokemons}
            setChosenPokemons={setChosenPokemons}
            isLost={isLost}
            setIsLost={setIsLost}
          />
        </>
      )}
    </>
  );
}

export default App;
