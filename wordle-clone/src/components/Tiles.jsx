import { useState, useEffect, useRef } from "react";
import "./Tiles.css";

function Tiles({ rowIndex, updateGuess, readOnlyRow, disableRow }) {
  const [letters, setLetters] = useState(["", "", "", "", ""]);
  const [validWords, setValidWords] = useState([]);
  const guessLength = 5;
  const inputRefs = useRef([]);
  let validity = "invalid";

  // Things to do when DOM loads -> Creating an array of valid words
  useEffect(() => {
    const callWhenDOMLoads = async () => {
      const textFile = await fetch("/validWords.txt");
      const textContent = await textFile.text();

      const words = textContent.split("\n").map((word) => word.slice(0, 5));

      setValidWords(words);
    };
    callWhenDOMLoads();
  }, []);

  // Function to check whether the given input is part of the word bank (valid 5 letter word)
  const isValid = (word) => {
    const validWordsSet = new Set(validWords);

    if (!validWordsSet.has(word.toLowerCase())) {
      return "invalid";
    }
    return "valid";
  };

  // Function to validate the user submission
  const validateSubmit = (letters) => {
    // Constructing the word from individual tile inputs
    const submitted_word = letters.join("").trim();

    // Checking for any blank spaces -> safety checking.
    if (submitted_word.length != 5) {
      return validity;
    } else {
      validity = isValid(submitted_word);
      return validity;
    }
  };

  const handleChange = (e, idx) => {
    // Creating a copy of the letters array and updating with user inputs
    const updatedLetters = [...letters];
    updatedLetters[idx] = e.target.value.toUpperCase();

    // Updating the state to trigger rendering
    setLetters(updatedLetters);

    // Moves cursor to next tile
    if (e.target.value && idx < guessLength - 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  // Function to moving cursor to previous tile on backspace
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }

    if (idx === guessLength - 1 && e.key === "Enter") {
      validity = validateSubmit(letters);
      if (validity === "invalid") {
        alert("Invalid input");
      } else {
        const wordSubmitted = letters.join("").trim();
        updateGuess(wordSubmitted, rowIndex);
        console.log("Valid submission");
      }
    }
  };

  return (
    <div>
      {/*Mapping through the letter array to create individual tiles to hold each letters*/}
      {letters.map((letter, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={letter}
          className="guessTile"
          ref={(el) => (inputRefs.current[idx] = el)}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          readOnly={readOnlyRow || (idx > 0 && letters[idx - 1] === "")}
          disabled={disableRow}
        ></input>
      ))}
    </div>
  );
}

export default Tiles;
