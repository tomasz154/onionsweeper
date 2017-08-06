import React from 'react';

export default function ({levels, currentLevel, onLevelChange}) {
    return (
        <form>
            <div>Poziom trudności</div>
            {levels.map((level, key) => <label key={key}>
                <input
                    value={key}
                    type="radio"
                    checked={key === currentLevel}
                    onChange={e => onLevelChange(e.target.value)}
                /> {level.name}
            </label>)}
        </form>
    );
};
