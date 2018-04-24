import React, { Component } from 'react'
import Point from 'src/models/point'
import { sortIndex } from 'actions/utils'

import 'style/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';

import Grid from 'components/grid'
import Header from 'components/header'
import List from 'components/list'

export default class Master extends Component {
    constructor() {
        super();

        this.state = {
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
                self.setState(self.state.points, self.actions().savePoints);
            },
            updateRank(e){
                self.state.points.splice(e.to, 0, self.state.points.splice(e.from, 1)[0]);
                self.state.points.map((p, i) => {
                    p.rank = i;
                })
                self.setState(self.state.points);
            },
            addPoint() {
                self.state.points.push(new Point({ x: 50, y: 50, rank: self.state.points.length }));
                self.setState(self.state);
            },
            savePoints() {
                const string = JSON.stringify(self.state.points);
                localStorage.yccPoints = string;
            },
            clearPoints() {
                delete localStorage.yccPoints;
                self.setState({ points: [] });
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
        const { points } = this.state;
        const actions = this.actions.call(this);
        window.POINTS = this.state.points;

        return (
            <div className="masterContainer">
                
                <Header actions={actions} />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <Grid actions={actions} points={points} />
                        </div>

                        <div className="col-md-4">
                            <List actions={actions} points={points} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}