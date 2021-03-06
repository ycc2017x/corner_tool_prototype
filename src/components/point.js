import React, { Component } from 'react'
import Draggable from 'react-draggable'

export default class Point extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }
    toggleOpen() {
        // this.setState({ open: !this.state.open });
    }
    render() {
        const state = this.state;
        const { x, y, id, translateX, translateY, isMoving, group, certified } = this.props;

        return (
            <Draggable
                // defaultPosition={{ x, y }}
                position={{ x, y }}
                bounds={this.props.bounds}
                onStart={this.props.onStart}
                onDrag={this.props.onDrag}
                onStop={this.props.onStop}>
                    <div onClick={this.toggleOpen.bind(this)} id={id} className={"draggablePoint " + (certified ? ' certified ' : '') + (isMoving ? 'react-draggable-dragging' : '') + (group !== undefined ? ' isGroup_' + group : '')}>{(this.props.rank + 1)}</div>
            </Draggable>
        )
    }
}