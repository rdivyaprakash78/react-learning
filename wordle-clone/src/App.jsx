import { useState } from "react";
import "./App.css";
import Tiles from "./components/Tiles.jsx";

function App() {
  const numGuesses = 6;
  const guessesArray = new Array(numGuesses).fill("");
  const [guesses, setGuesses] = useState(guessesArray);

  const updateGuess = (guess, idx) => {
    let updatedGuesses = [...guesses];
    updatedGuesses[idx] = guess;
    setGuesses(updatedGuesses);
  };

  return (
    <div>
      <h1 className="Title">Wordle clone</h1>
      {guesses.map((curGuess, idx) => (
        <Tiles
          key={idx}
          rowIndex={idx}
          updateGuess={updateGuess}
          readOnlyRow={idx > 0 && guesses[idx - 1] === ""}
          disableRow={guesses[idx] != ""}
        ></Tiles>
      ))}
    </div>
  );
}

export default App;
