import React from 'react';

export default function ({minesLeft, elapsedTime, onReset}) {
  return <div className="top">
    <div className="number">
      {minesLeft}
    </div>

    <div>
      <button onClick={onReset}><img src="/onion.png" alt="" className="mine"/></button>
    </div>

    <div className="number">{elapsedTime}</div>
  </div>
}
