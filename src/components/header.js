import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        const { actions } = this.props;

        return (
            <div id="mainNav" className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="">Your Corner Consulting</a>

                <button onClick={actions.savePoints} className="btn btn-sm btn-success pull-right"><i className="fa fa-save" /></button>
                <button onClick={actions.clearPoints} className="btn btn-sm btn-danger pull-right"><i className="fa fa-trash" /></button>
            </div>
        )
    }
}