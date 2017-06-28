import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Minesweeper from './Minesweeper';
import * as Actions from './actions';
import makeBoard from './makeBoard';

class MinesweeperContainer extends Component {
    handleRevealCell(i, j) {
        this.props.actions.revealCell(i, j);
    }

    handleToggleCellMark(i, j) {
        this.props.actions.toggleMark(i, j);
    }

    handleReset() {
        const mines = 10;
        const board = makeBoard(10, mines);
        this.props.actions.reset(board, mines);
    }

    render() {
        return <Minesweeper
            board={this.props.board}
            gameOver={this.props.gameOver}
            won={this.props.won}
            minesLeft={this.props.totalMines - this.props.markedMines}
            onRevealCell={this.handleRevealCell.bind(this)}
            onToggleCellMark={this.handleToggleCellMark.bind(this)}
            onReset={this.handleReset.bind(this)}
        />;
    }
}

function mapStateToProps(state) {
    return {
        board: state.board,
        totalMines: state.totalMines,
        markedMines: state.markedMines,
        gameOver: state.gameOver,
        won: state.won,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MinesweeperContainer);
