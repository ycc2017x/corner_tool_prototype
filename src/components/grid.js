import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { translatePointToGrid, translatePointToData } from "actions/utils";

import Point from 'components/point'

export default class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gridHeight: 50,
            gridWidth: 50,
            forceWidth: false,
        }
    }
    onDragStart(ind, e, t) {
        // console.log('start', ind, e, t)
    }
    onDrag(ind, e, t) {
        // console.log('drag', e.target, t)
    }
    onStop(ind, e, t) {
        const { actions } = this.props;
        if(actions && actions.updatePoint) {
            const h = this.state.gridHeight;
            const x = translatePointToData(h, t.x);
            const y = translatePointToData(h, t.y);
            actions.updatePoint(ind, x, y);
        }
    }
    buildPoints() {
        const displayPoints = [];
        const points = this.props.points.slice(0);

        points.map((_p, i) => {
            let p = JSON.parse(JSON.stringify(_p));
            p.onDrag = this.onDrag.bind(this, i);
            p.onStart = this.onDragStart.bind(this, i);
            p.onStop = this.onStop.bind(this, i);
            p.rank = i;
            p.bounds = 'parent';
            p.x = translatePointToGrid(this.state.gridHeight, p.x);
            p.y = translatePointToGrid(this.state.gridHeight, p.y);
            displayPoints.push((<Point key={i} {...p} />))
        })

        return displayPoints;
    }
    makeSquare() {
        const node = this.Container;
        const masterNode = document.getElementById('applicationRoot');
        const mainNav = document.getElementById('mainNav');
        const maxHeight = masterNode.clientHeight - mainNav.clientHeight - 30;

        let gridWidth = node.clientWidth;
        let gridHeight = node.clientWidth;
        let forceWidth = false;

        if(node.clientWidth >= maxHeight) {
            gridWidth = maxHeight;
            gridHeight = maxHeight;
            forceWidth = true;
        }
        this.setState({ gridWidth, gridHeight }, this.buildPoints.bind(this));
    }
    componentDidMount() {
        setTimeout(this.makeSquare.bind(this), 10);

        let doit;
        window.onresize = () => {
            clearTimeout(doit);
            doit = setTimeout(this.makeSquare.bind(this), 100);
        };
    }
    render() {
        const state = this.state;
        const height = state.gridHeight;
        const points = this.buildPoints.call(this);
        
        return (
            <div id={"GridContainer"} ref={comp => this.Container = comp} style={{ height, width: state.forceWidth ? state.gridWidth : undefined }} className="gridContainer">
                <div className="gridLine gridLineY" />
                <div className="gridLine gridLineX" />

                <div className="legend legendX">
                    <div>Don't Like</div>
                    <div>Like</div>
                </div>

                <div className="legend legendY">
                    <div>Good At</div>
                    <div>Not Good At</div>
                </div>

                {points}
            </div>
        )
    }
}