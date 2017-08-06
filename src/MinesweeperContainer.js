import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Minesweeper from './Minesweeper';
import * as Actions from './actions';

class MinesweeperContainer extends Component {
    handleRevealCell(i, j) {
        this.props.actions.revealCell(i, j);
    }

    handleToggleCellMark(i, j) {
        this.props.actions.toggleMark(i, j);
    }

    handleReset() {
        this.props.actions.newGame();
    }

    handleLevelChange(level) {
        this.props.actions.setLevel(Number(level));
        this.props.actions.newGame();
    }

    render() {
        return <Minesweeper
            board={this.props.board}
            gameOver={this.props.gameOver}
            won={this.props.won}
            minesLeft={this.props.totalMines - this.props.markedMines}
            elapsedTime={this.props.elapsedTime}
            onRevealCell={this.handleRevealCell.bind(this)}
            onToggleCellMark={this.handleToggleCellMark.bind(this)}
            onReset={this.handleReset.bind(this)}
            levels={this.props.levels}
            settings={this.props.settings}
            onLevelChange={this.handleLevelChange.bind(this)}
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
        elapsedTime: state.elapsedTime,
        levels: state.levels,
        settings: state.settings,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MinesweeperContainer);
