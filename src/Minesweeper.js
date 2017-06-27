import React, {Component} from 'react';

function Cell({cell, onReveal, onMark}) {
    return <td
        className={cell.exploded ? 'exploded' : cell.marked ? 'marked' : cell.revealed ? (cell.adjacentMines ? 'revealed mines_' + cell.adjacentMines : 'revealed') : ''}
        onClick={onReveal}
        onContextMenu={onMark}>
        {cell.exploded ? '💥' : cell.marked ? '🚩' : cell.revealed ? (cell.adjacentMines ? cell.adjacentMines : '') : ''}
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

    render() {
        return <div>
            {this.props.minesLeft}
            <button onClick={this.reset.bind(this)}>reset</button>
            <table>
                <tbody>
                {this.props.board.map((row, i) => <tr key={i}>
                    {row.map((cell, j) => <Cell
                        key={j} cell={cell}
                        onReveal={(e) => this.revealCell(e, i, j)}
                        onMark={(e) => this.toggleCellMark(e, i, j)}
                    />)}
                </tr>)}
                </tbody>
            </table>
        </div>;
    }
}

export default Minesweeper;
