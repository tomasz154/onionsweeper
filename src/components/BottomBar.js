import React from 'react';

export default function ({gameOver, won}) {
  return <div className="bottom">
    {gameOver && won ? 'Gratulacje!' : ''}
  </div>
}
