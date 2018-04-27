import React, { Component } from 'react'
import SortableListView from 'components/sortablelistview'

class ListItem extends Component {
    render() {
        const { id, rank, description, category, priority, skill, isMoving } = this.props.data;
        const { deletePoint, addPoint } = this.props.actions;
        
        return (
            <div onClick={addPoint.bind(null, this.props.data)} className={"list-group-item skillItem " + (isMoving ? 'isMoving' : '')}>
                {'Skill ' + (rank + 1) + ': ' + category.title}

                <button className="btn btn-danger btn-sm pull-right" onClick={deletePoint.bind(null, rank)}>
                    <i className="fa fa-trash" />
                </button>
            </div>
        )
    }
}

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containerHeight: 50
        }
    }
    calcRows() {
        let rows = {};
        let rowsOrder = [];

        this.props.points.map((p, i) => {
            let rid = p.id.toString();
            if(!rows[rid]) {
                rows[rid] = p;
                rowsOrder.push(rid);
            }
        })

        return { rows, rowsOrder };
    }
    giveHeight() {
        const masterNode = document.getElementById('applicationRoot');
        const mainNav = document.getElementById('mainNav');
        const maxHeight = masterNode.clientHeight - mainNav.clientHeight - 20;

        this.setState({ containerHeight: maxHeight });
    }
    componentDidMount() {
        setTimeout(this.giveHeight.bind(this), 10);
    }
    render() {
        const { containerHeight } = this.state;
        const { addPoint, updateRank, startMove } = this.props.actions;
        const { rows, rowsOrder } = this.calcRows.call(this);

        return (
            <div id="ListContainer" style={{ height: containerHeight }} className="listContainer list-group">
                <div className="list-group-item list-group-item-primary panel-header" onClick={addPoint.bind(null, null)}>
                    <div className="rivet topLeft" />
                    <div className="rivet topRight" />
                    <div className="rivet bottomRight" />
                    <div className="rivet bottomLeft" />

                    <h1>Skills</h1>
                    <button className="btn btn-sm btn-default pull-right"><i className="fa fa-plus" /></button>
                </div>

                <SortableListView
                    data={rows}
                    order={rowsOrder}
                    onRowMoved={updateRank}
                    onSortStart={({ index }) => { startMove(index) }}
                    renderRow={row => <ListItem key={row.rank} {...this.props} data={row} />} />
            </div>
        )
    }
}