import React from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combination";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

// set active player
function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].Player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

//according to row and col it set
function dervedGameBoard(gameTurns) {
  let gameboard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, Player } = turn;
    const { row, col } = square;

    gameboard[row][col] = Player;
  }
  return gameboard;
}

//check for the winning condition
function derivedWinner(gameboard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameboard = dervedGameBoard(gameTurns);
  const winner = derivedWinner(gameboard, players);

  // If length is 9 then all field are full so its called draw condition
  const hasDraw = gameTurns.length === 9 && !winner;

  //after setting any one button to x or o then not change when we click again
  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIdx, col: colIdx }, Player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  //after all field are full then just reset
  function hanldeRestart() {
    setGameTurns([]);
  }

  //set player name and symbol for both player
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* Both player */}
          <Player
            initialname={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            initialname={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
          ></Player>
        </ol>
        {/* Winning or draw  */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={hanldeRestart}></GameOver>
        )}
        <GameBoard
          board={gameboard}
          onSelectSquare={handleSelectSquare}
        ></GameBoard>
      </div>
      {/* print all logs */}
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
