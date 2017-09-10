import React, {Component} from 'react';
import Settings from './Settings'
import Cell from "./Cell";

class Minesweeper extends Component {
    revealCell(e, i, j) {
        e.preventDefault();
        this.props.onRevealCell(i, j);
    }

    toggleCellMark(e, i, j) {
        e.preventDefault();
        this.props.onToggleCellMark(i, j);
    }

    reset() {
        this.props.onReset();
    }

    changeLevel(level) {
        this.props.onLevelChange(level);
    }

    render() {
        return <div>
            <div className="game">
                <div className="top">
                    <div className="number">
                        {this.props.minesLeft}
                    </div>

                    <div>
                        <button onClick={this.reset.bind(this)}><img src="/onion.png" alt="" className="mine"/></button>
                    </div>

                    <div className="number">{this.props.elapsedTime}</div>
                </div>

                <table>
                    <tbody>
                    {this.props.board.map((row, i) => <tr key={i}>
                        {row.map((cell, j) => <Cell
                            key={j} cell={cell}
                            gameOver={this.props.gameOver}
                            onReveal={(e) => this.revealCell(e, i, j)}
                            onMark={(e) => this.toggleCellMark(e, i, j)}
                        />)}
                    </tr>)}
                    </tbody>
                </table>

                <div className="bottom">
                    {this.props.gameOver && this.props.won ? 'Gratulacje!' : ''}
                </div>
            </div>
            <Settings
                levels={this.props.levels}
                currentLevel={this.props.settings.currentLevel}
                onLevelChange={level => this.changeLevel(level)}
            />
        </div>;
    }
}

export default Minesweeper;
