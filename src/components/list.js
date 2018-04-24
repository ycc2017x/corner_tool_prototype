import React, { Component } from 'react'
import SortableListView from 'components/sortablelistview'

class ListItem extends Component {
    render() {
        const { id, rank, description } = this.props.data;
        
        return (
            <div className="list-group-item">
                {(rank + 1) + ': ' + description}
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
        const { addPoint, updateRank } = this.props.actions;
        const { rows, rowsOrder } = this.calcRows.call(this);

        return (
            <div id="ListContainer" style={{ height: containerHeight }} className="listContainer list-group">
                <div className="list-group-item list-group-item-primary">
                    SKILLS
                    <button className="btn btn-sm btn-default pull-right" onClick={addPoint}><i className="fa fa-plus" /></button>
                </div>

                <SortableListView
                    data={rows}
                    order={rowsOrder}
                    onRowMoved={updateRank}
                    renderRow={row => <ListItem key={row.rank} {...this.props} data={row} />} />
            </div>
        )
    }
}