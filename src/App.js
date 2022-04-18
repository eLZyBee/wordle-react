import React, { useState } from "react";
import { LetterBlock } from "./Components/LetterBlock/letterBlock";
import { UserInput } from "./Components/UserInput/UserInput";
import { startGame, enumMapColors } from "./utils/game";

export const App = () => {
  const word = "racing";
  const wordArray = word.toUpperCase().split("");
  const [ game, setGame ] = useState(startGame());
  const [guessInput, setGuessInput] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const { length, checker } = game;

  console.log(wordArray);

  // const gameContext = React.useContext("");

  const checkGuess = () => {
    const checked = checker(guessInput);
    if (!checked) return;
    setGuessed([
      ...guessed,
      checked.map((n, i) => ({ letter: guessInput[i], enum: n })),
    ]);
    setGuessInput("");
  };

  const renderGuess = (guess) => (
    <div className="container">
      {guess.map((g, index) => (
        <LetterBlock
          key={index}
          color={enumMapColors[g.enum]}
          letter={g.letter}
        />
      ))}
    </div>
  );

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") checkGuess();
  };

  return (
    <>
      <div>Wordley</div>
      <div>{guessed.map(renderGuess)}</div>
      <div className="container">
        {new Array(length).fill(0).map((g, i) => (
          <LetterBlock key={i} letter={guessInput[i] || ""} />
        ))}
      </div>
      <input
        onChange={(e) => setGuessInput(e.target.value.trim().slice(0, length))}
        value={guessInput}
        onKeyDown={_handleKeyDown}
      />
      <button onClick={checkGuess}>Check</button>
      <button onClick={() => setGame(startGame())}>Reset</button>
      <UserInput />
    </>
  );
};
