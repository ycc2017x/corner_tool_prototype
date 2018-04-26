import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        const { actions } = this.props;

        return (
            <div id="mainNav" className="navbar navbar-fixed-top">
                <a className="navbar-brand" href="">Your Corner Consulting</a>

                <div className="pull-right buttonContainer">
                    {/* <button onClick={actions.savePoints} className="btn btn-sm btn-success pull-right"><i className="fa fa-save" /></button> */}
                    <button onClick={actions.clearPoints} className="btn btn-sm btn-danger"><i className="fa fa-trash" /> Clear Points</button>
                </div>
            </div>
        )
    }
}