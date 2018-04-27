import React, { Component } from 'react'
import SortableListView from 'components/sortablelistview'

class ListItem extends Component {
    isSelected() {
        const { snapsToCompare } = this.props;
        const { index } = this.props.data;
        let isSelected = false;

        for(var i = 0; i < snapsToCompare.length; i++) {
            if(snapsToCompare[i].index === index) {
                isSelected = true;
                break;
            }
        }

        return isSelected;
    }
    render() {
        const { date, points, index } = this.props.data;
        const { deletePoint, addPoint, addSnapsToCompare } = this.props.actions;
        const isSelected = this.isSelected.call(this);

        return (
            <div className={"list-group-item skillItem snapShotItem"}>
                {'Snapshot Date - ' + (date) + ': '}

                <i onClick={addSnapsToCompare.bind(null, index)} className={isSelected ? "fa fa-check-square pull-right" : "fa fa-square pull-right"} />
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

        this.props.snaps.map((p, i) => {
            let rid = p.date.toString();
            if (!rows[rid]) {
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
        const { addPoint, updateRank, startMove, toggleSnapShot, createSnapShot } = this.props.actions;
        const { rows, rowsOrder } = this.calcRows.call(this);

        return (
            <div id="ListContainer" style={{ height: containerHeight }} className="listContainer list-group">
                <div className="list-group-item list-group-item-primary panel-header">
                    <div className="rivet topLeft" />
                    <div className="rivet topRight" />
                    <div className="rivet bottomRight" />
                    <div className="rivet bottomLeft" />

                    <h1>SnapShots</h1>
                    <button onClick={createSnapShot} className="btn btn-sm btn-default pull-right"><i className="fa fa-plus" /></button>                    
                    <button onClick={toggleSnapShot} className="btn btn-sm btn-default pull-left toggleSnap"><i className="fa fa-arrow-circle-left" /></button>
                </div>

                <SortableListView
                    data={rows}
                    shouldCancelStart={() => true}
                    order={rowsOrder}
                    onRowMoved={updateRank}
                    renderRow={row => <ListItem key={row.rank} {...this.props} data={row} />} />
            </div>
        )
    }
}