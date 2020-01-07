import React, { Component } from 'react'
import Transactions from './Transactions'
import Transaction from './Transaction'
import { Link } from "react-router-dom";

class Operations extends Component {
    
    constructor() {
        super()
    }

    updateAmtValue = (e) => {
        const value = e.target.value
        this.props.updateAmtValue(value)
    }

    updateVendor = (e) => {
        const value = e.target.value
        this.props.updateVendorValue(value)
    }

    updateCategory = (e) => {
        const value = e.target.value
        this.props.updateCategoryValue(value)
    }

    addTransaction = (isDeposit) => {
        let localAmount = this.props.amountValue
        if (!isDeposit) {
            localAmount = localAmount * -1
        }
        const newDeposit = {
            amount: parseInt(localAmount), 
            vendor: this.props.vendorValue, 
            category: this.props.categoryValue
        }
        this.props.updateTransactions(newDeposit)
    }

    render() {
        
        return (
            <div>
                <input className='amount' 
                       placeholder='amount'
                       type='number' 
                       value={this.props.amountValue} 
                       onChange={this.updateAmtValue} />
                
                <input className='vendor' 
                       placeholder='vendor' 
                       type='text'
                       value={this.props.vendorValue} 
                       onChange={this.updateVendor} />
                
                <input className='category' 
                       placeholder='category' 
                       type='select' 
                       value={this.props.cateogryValue} 
                       onChange={this.updateCategory}/>
                
                <Link to='/'>
                    <button className='depositBtn' onClick={()=>this.addTransaction(true)}>
                        Deposit
                    </button>
                </Link>
                
                <Link to='/'>
                    <button className='withdrawBtn' onClick={()=>this.addTransaction(false)}>
                        Withdraw
                    </button>
                </Link>
            </div>
        )
    }
}

export default Operations