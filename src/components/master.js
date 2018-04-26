import React, { Component } from 'react'
import Point from 'src/models/point'
import { sortIndex } from 'actions/utils'

import 'style/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';

import Grid from 'components/grid'
import Header from 'components/header'
import List from 'components/list'
import AddItem from 'components/additem'

export default class Master extends Component {
    constructor() {
        super();

        this.state = {
            addItem: null,
            points: [
                new Point({ x: 50, y: 50, rank: 0 }),
                new Point({ x: 75, y: 25, rank: 1 }),
            ]
        }
    }
    actions() {
        const self = this;
        return {
            updatePoint(rank, x, y) {
                const point = self.state.points[rank];
                point.x = x;
                point.y = y;
                self.state.points[rank].isMoving = undefined;
                self.setState(self.state.points, self.actions().savePoints);
            },
            updateRank(e){
                self.state.points[e.from].isMoving = false;
                self.state.points.splice(e.to, 0, self.state.points.splice(e.from, 1)[0]);
                self.state.points.map((p, i) => {
                    p.rank = i;
                })
                self.setState(self.state.points);
            },
            addPoint(point) {
                self.setState({ addItem: point || {} });
            },
            startMove(ind) {
                self.state.points[ind].isMoving = true;
                self.setState(self.state);
            },
            deletePoint(ind) {
                const point = self.state.points[ind];

                if(point) {
                    let c = confirm('Are you sure you want to delete this point?');

                    if(c) {
                        self.state.points.splice(ind, 1);
                        self.state.points.map((p, i) => {
                            p.rank = i;
                        })
                        self.setState(self.state);
                        self.actions().savePoints();
                    }
                }
            },
            submitPoint(point) {
                if(point) {
                    if(point.rank !== undefined) { //point already exists so we are just updating it
                        self.state.points[point.rank] = point;
                        self.actions().savePoints();
                    } else {
                        self.state.points.push(new Point(Object.assign(point, { x: 50, y: 50, rank: self.state.points.length })));
                        self.actions().savePoints();
                    }
                }
                
                self.state.addItem = null;
                self.setState(self.state);
            },
            savePoints() {
                const string = JSON.stringify(self.state.points);
                localStorage.yccPoints = string;
            },
            clearPoints() {
                let c = confirm('Are you sure you want to delete all points?');

                if(c) {
                    delete localStorage.yccPoints;
                    self.setState({ points: [] });
                }
            }
        }
    }
    componentDidMount() {
        if(localStorage && localStorage.yccPoints) {
            const pnts = JSON.parse(localStorage.yccPoints);
            const points = [];
            pnts.sort(sortIndex).map((p, i) => {
                p.rank = i;
                points.push(new Point(p));
            })

            this.setState({ points });
        }
    }
    render() {
        const { points, addItem } = this.state;
        const actions = this.actions.call(this);
        window.POINTS = this.state.points;

        return (
            <div className="masterContainer">
                
                <Header actions={actions} />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 overflowHidden">
                            <Grid actions={actions} points={points} />
                        </div>

                        <div className="col-md-4">
                            <List actions={actions} points={points} />
                        </div>
                    </div>
                </div>

                {addItem && <AddItem {...this.state} actions={actions} />}

            </div>
        )
    }
}