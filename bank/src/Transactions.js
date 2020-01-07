import React, { Component } from 'react'
import Transaction from './Transaction';


class Transactions extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div>
                {this.props.data.map( t => 
                <Transaction data={t} deleteTransaction={this.props.deleteTransaction}/>)}
            </div>
        )
    }
}

export default Transactions
