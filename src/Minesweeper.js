import React, {Component} from 'react';
import Settings from './Settings'

function Mine() {
    return <img src="/onion.png" alt="" className="mine"/>;
}

function Cell({cell, onReveal, onMark, gameOver}) {
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
