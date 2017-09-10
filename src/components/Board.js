import React from 'react';
import Cell from "./Cell";

export default function ({board, gameOver, onReveal, onMark}) {
  return <table>
    <tbody>
    {board.map((row, i) => <tr key={i}>
      {row.map((cell, j) => <Cell
        key={j}
        cell={cell}
        gameOver={gameOver}
        onReveal={(e) => onReveal(e, i, j)}
        onMark={(e) => onMark(e, i, j)}
      />)}
    </tr>)}
    </tbody>
  </table>
}
