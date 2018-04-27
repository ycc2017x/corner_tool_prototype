import React, { Component } from 'react'
import Point from 'src/models/point'
import { sortIndex } from 'actions/utils'

import 'style/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';

import Grid from 'components/grid'
import Header from 'components/header'
import List from 'components/list'
import SnapList from 'components/snaplist'
import AddItem from 'components/additem'

export default class Master extends Component {
    constructor() {
        super();

        this.state = {
            addItem: null,
            showSnaps: false,
            snaps: [],
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
            deletePoint(ind, e) {
                if(e) {
                    e.preventDefault && e.preventDefault();
                    e.stopPropagation && e.stopPropagation();
                }

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
                        delete point.addItem;
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
            clearPoints(dontAsk) {
                let c = dontAsk === true ? true : confirm('Are you sure you want to delete all points?');

                if(c) {
                    delete localStorage.yccPoints;
                    self.setState({ points: [] });
                }
            },
            createSnapShot() {
                const snaps = JSON.parse(localStorage.yccSnaps || '[]');
                const points = self.state.points;

                snaps.push({
                    date: new Date(),
                    points: points
                })

                localStorage.yccSnaps = JSON.stringify(snaps);
                self.setState({ snaps });
                self.actions().clearPoints(true);
            },
            toggleSnapShot(e) {
                if (e) {
                    e.preventDefault && e.preventDefault();
                    e.stopPropagation && e.stopPropagation();
                }

                self.setState({ showSnaps: !self.state.showSnaps });
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

        if (localStorage && localStorage.yccSnaps) {
            const snaps = JSON.parse(localStorage.yccSnaps);
            this.setState({ snaps });
        }
    }
    render() {
        const state = this.state;
        const { points, addItem, snaps } = state;
        const actions = this.actions.call(this);
        window.MAINSTATE = this.state;

        return (
            <div className="masterContainer">
                
                <Header actions={actions} />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 overflowHiddenY">
                            <Grid actions={actions} {...state} />
                        </div>

                        <div className="col-md-4">
                            {!state.showSnaps && <List actions={actions} {...state} />}
                            {state.showSnaps && <SnapList actions={actions} {...state} />}
                        </div>
                    </div>
                </div>

                {addItem && <AddItem {...this.state} actions={actions} />}

            </div>
        )
    }
}