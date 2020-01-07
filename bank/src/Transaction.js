import React, { Component } from 'react'

class Transaction extends Component {

    constructor(){
        super()
    }

    deleteTransaction = () => {
        this.props.deleteTransaction(this.props.data._id)
    }

    render() {
        return (
            <div className='transaction' id={this.props.data._id}>
                <div id='amount'>
                    {this.props.data.amount}
                </div>
                <div id='vendor'>
                    {this.props.data.vendor}            
                </div>
                <div id='category'>
                    {this.props.data.category}            
                </div>
                <button className='dltBtn' onClick={this.deleteTransaction}>-</button>
            </div>
        )
    }
}

export default Transaction
