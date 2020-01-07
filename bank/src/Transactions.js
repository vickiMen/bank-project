import React, { Component } from 'react'
import Transaction from './Transaction';


class Transactions extends Component {

    constructor() {
        super()
    }

    render() {
        
        this.props.data.forEach( t => {
            t.amount < 0 ? t.color = 'red' : t.color = 'green'
        })

        return (
            <div className='transactions'>
                {this.props.data.map( t => 
                    <Transaction color={t.color} data={t} deleteTransaction={this.props.deleteTransaction}/>)}
            </div>
        )
    }
}

export default Transactions
