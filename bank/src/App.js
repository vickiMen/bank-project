// import React from 'react';
import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Transactions from './Transactions';
import Operations from './Operations';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()
    this.state = {
      // data: this.bla(),
      data: [],
      amountValue: null,
      vendorValue: '',
      categoryValue: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3002/transactions')
    .then(response => {
      this.setState({
        data: response.data
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  totalAmtCalc = () => {
    let amountsArr = this.state.data.map( d => d.amount )
    return amountsArr.reduce((a,b) => a+b, 0)
  }


  updateAmtValue = (newValue) => {
    this.setState({
      amountValue: newValue
    })
  }

  updateVendorValue = (newValue) => {
    this.setState({
      vendorValue: newValue
    })
  }

  updateCategoryValue = (newValue) => {
    this.setState({
      categoryValue: newValue
    })
  }

  updateTransactions = (newObj) => {
    axios.post('http://localhost:3002/transaction', newObj )
    .then(response => {
      let localData = [...this.state.data]
      localData.push(response.data)
      this.setState({
        data: localData
      })
    })
  }

  deleteTransaction = (id) => {
    axios.delete(`http://localhost:3002/transaction/${id}`)
      .then(res => {
        let localData = [...this.state.data]
        const deletedTransaction = localData.find( t => t._id == id )
        const index = localData.indexOf(deletedTransaction)
        localData.splice(index,1)
        this.setState({
          data: localData
        })
        console.log(res)
        console.log(res.data)
      })
  }
    
  render() {
    return (
      <div>
        <div className='balance'>
          Total Balance: <br></br>
          {this.totalAmtCalc()}
        </div>
        
        <Transactions data={this.state.data} deleteTransaction={this.deleteTransaction}/>
        
        <Operations data={this.state.data} 
                    amountValue={this.state.amountValue} 
                    vendorValue={this.state.vendorValue} 
                    categoryValue={this.state.categoryValue} 
                    updateAmtValue={this.updateAmtValue}
                    updateVendorValue={this.updateVendorValue}
                    updateCategoryValue={this.updateCategoryValue}
                    updateTransactions={this.updateTransactions}/>
      </div>
    )
  }
}

export default App