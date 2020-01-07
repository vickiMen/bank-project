import React, { Component } from 'react'

class Categories extends Component {

    render() {
        return (
            <span>
                {this.props.categories()}
            </span>
        )
    }
}

export default Categories
