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

    render() {
        return <Minesweeper
            board={this.props.board}
            minesLeft={this.props.totalMines - this.props.markedMines}
            onRevealCell={this.handleRevealCell.bind(this)}
            onToggleCellMark={this.handleToggleCellMark.bind(this)}
        />;
    }
}

function mapStateToProps(state) {
    return {
        board: state.board,
        totalMines: state.totalMines,
        markedMines: state.markedMines,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MinesweeperContainer);
