import React from 'react';

export default function ({levels, rank}) {
    return (
        <section className="leaderboard">
            {levels.map((level, key) => <section key={key}>
                <header>{level.name}</header>
                <div>
                    {rank[key].map((row, rankKey) => <div key={rankKey}>
                        {row.name} {row.time}
                    </div>)}
                </div>
            </section>)}
        </section>
    );
};
