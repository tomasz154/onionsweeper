import React from 'react';
import Mine from "./Mine";

export default function ({cell, onReveal, onMark, gameOver}) {
  return <td
    className={cell.exploded ? 'exploded' : cell.marked ? (gameOver && !cell.mine ? 'false_positive' : 'marked') : cell.revealed ? (cell.adjacentMines ? 'revealed mines_' + cell.adjacentMines : 'revealed') : ''}
    onClick={onReveal}
    onContextMenu={onMark}>
    {cell.exploded ? <Mine/>
      : cell.marked ? (gameOver && !cell.mine ? <Mine/> : '🚩')
        : cell.revealed ? (cell.adjacentMines ? cell.adjacentMines : '')
          : ''
    }
  </td>;
}
