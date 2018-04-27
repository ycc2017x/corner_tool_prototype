import ReactDom, { findDOMNode } from 'react-dom'
import React, { Component } from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement((props) => {
    return props.render(Object.assign({}, props.data))
});

const SortableList = SortableContainer((props) => {
    return (
        <div>
            {props.items.map((value, index) => {
                return <SortableItem key={`item-${index}`} index={index} data={props.data[value]} render={props.render} />
            })}
        </div>
    );
});

class SortableListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false
        }
    }
    actions() {
        let self = this;
        return {
            _onRefresh(runMethod) {
                self.setState({ refreshing: true });
                if (self.props.onRefresh && (runMethod === undefined || runMethod)) {
                    self.props.onRefresh(function () {
                        self.setState({ refreshing: false });
                    })
                } else {
                    self.setState({ refreshing: false });
                }
            },
            onSortEnd(indexes, e) {
                let props = self.props;
                if (props.onRowMoved) {
                    props.onRowMoved({ to: indexes.newIndex, from: indexes.oldIndex })
                }
            }
        }
    }
    componentDidMount() {
        let cont = findDOMNode(this.refs.scrollContainer);
        cont.scrollTop = 50;
    }
    render() {
        var self = this,
            props = self.props,
            state = self.state,
            data = props.data,
            rows = props.order,
            actions = self.actions();

        return (
            <div className="sortableListViewContainer" ref={"scrollContainer"} style={[props.style, { flexDirection: 'column', flex: 1, overflowX: 'hidden' }]}>

                <SortableList items={rows} shouldCancelStart={props.shouldCancelStart} onSortStart={props.onSortStart} onSortEnd={actions.onSortEnd} lockAxis={"y"} pressDelay={300} data={props.data} rowHasChanged={props.rowHasChanged} render={props.renderRow} />

            </div>
        )
    }
}

module.exports = SortableListView;