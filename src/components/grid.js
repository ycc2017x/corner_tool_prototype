import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { translatePointToGrid, translatePointToData } from "actions/utils";

import Point from 'components/point'

const noop = () => {}

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
        const { actions } = this.props;
        actions.startMove(ind);
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
        const { points, snapsToCompare, showSnaps } = this.props;
        const displayPoints = [];
        let _points = this.props.points.slice(0);
        
        if(showSnaps) {
            _points = [];
            snapsToCompare.map((s, i) => {
                s.points.map((p, _i) => {
                    p.group = s.index;
                    p.realRank = _i;
                    _points.push(p);
                })
            })
        }

        _points.map((_p, i) => {
            let p = JSON.parse(JSON.stringify(_p));
            p.onDrag = showSnaps ? noop : this.onDrag.bind(this, i);
            p.onStart = showSnaps ? noop : this.onDragStart.bind(this, i);
            p.onStop = showSnaps ? noop : this.onStop.bind(this, i);
            p.rank = p.realRank !== undefined ? p.realRank : i;
            p.bounds = 'parent';
            p.x = translatePointToGrid(this.state.gridHeight, p.x);
            p.y = translatePointToGrid(this.state.gridHeight, p.y);
            displayPoints.push((<Point key={_p.id} {...p} />))
        })

        return displayPoints;
    }
    makeSquare() {
        const node = this.Container;
        const masterNode = document.getElementById('applicationRoot');
        const mainNav = document.getElementById('mainNav');
        const maxHeight = masterNode.clientHeight - mainNav.clientHeight - 60;

        let gridWidth = node.clientWidth;
        let gridHeight = node.clientWidth;
        let forceWidth = false;

        if(node.clientWidth >= maxHeight) {
            gridWidth = maxHeight;
            gridHeight = maxHeight;
            forceWidth = true;
        }
        this.setState({ gridWidth, gridHeight, forceWidth }, this.buildPoints.bind(this));
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
        const { flippedX, flippedY, actions } = this.props;
        const state = this.state;
        const height = state.gridHeight;
        const points = this.buildPoints.call(this);
        
        return (
            <div id={"GridContainer"} ref={comp => this.Container = comp} style={{ height, width: state.forceWidth ? state.gridWidth : undefined }} className="gridContainer">
                <div className="gridLine gridLineY" />
                <div className="gridLine gridLineX" />

                <div className="rivet topLeft" />
                <div className="rivet topRight" />
                <div className="rivet bottomRight" />
                <div className="rivet bottomLeft" />

                {flippedX ? (
                    <div className="legend legendX">
                        <div>Like</div>
                        <div>Don't Like</div>
                    </div>
                ) : (
                    <div className="legend legendX">
                        <div>Don't Like</div>
                        <div>Like</div>
                    </div>
                )}

                {flippedY ? (
                    <div className="legend legendY">
                        <div>Not Good At</div>
                        <div>Good At</div>
                    </div>
                ) : (
                    <div className="legend legendY">
                        <div>Good At</div>
                        <div>Not Good At</div>
                    </div>
                )}

                <button onClick={actions.toggleFlip.bind(null, 'X')} className="toggleFlippedX btn-warning btn-xs">
                    <i className={'fa fa-exchange'} />
                </button>

                {points}
            </div>
        )
    }
}