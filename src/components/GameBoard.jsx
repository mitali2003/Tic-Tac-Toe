import React, { useCallback, useState } from "react";

function GameBoard({ onSelectSquare, board }) {
  //const [gameboard, SetGameBoard] = useState(initialState);
  // const handlePlayerSymbol = (rowIdx, colIdx) => {
  //   {
  //     console.log(rowIdx, colIdx);
  //   }
  //   SetGameBoard((prevGameBoard) => {
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     {
  //       console.log(updatedBoard);
  //     }
  //     updatedBoard[rowIdx][colIdx] = activePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // };

  return (
    <ol id="game-board">
      {board.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playerSymbol, colIdx) => (
              <li key={colIdx}>
                <button
                  onClick={() => onSelectSquare(rowIdx, colIdx)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
