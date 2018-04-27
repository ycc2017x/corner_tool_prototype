import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Master from 'components/master'

class Root extends Component {
    render() {
        return (
            <Master />
        )
    }
}

ReactDom.render(<Root />, document.getElementById('applicationRoot'));