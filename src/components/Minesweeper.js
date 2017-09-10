import React, {Component} from 'react';
import Settings from './Settings'
import Board from "./Board";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

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
                <TopBar
                  minesLeft={this.props.minesLeft}
                  elapsedTime={this.props.elapsedTime}
                  onReset={this.reset.bind(this)}
                />

                <Board
                  board={this.props.board}
                  gameOver={this.props.gameOver}
                  onReveal={(e, i, j) => this.revealCell(e, i, j)}
                  onMark={(e, i, j) => this.toggleCellMark(e, i, j)}
                />
                
                <BottomBar
                  gameOver={this.props.gameOver}
                  won={this.props.won}
                />
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
