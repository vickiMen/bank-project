// import React from 'react';
import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Transactions from './Transactions';
import Operations from './Operations';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Categories from './Categories';

class App extends Component {

  constructor() {
    super()
    this.state = {
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

  retrieveCategories = () => {
    let removeDuplicates = []
    let categories = this.state.data.map( t => ( 
        {
          category: t.category.toLowerCase(), 
          amount: [t.amount]
        }
    ))
    
    for (let i=0; i<categories.length; i++){
      for (let j=i+1; j<categories.length; j++){
        if (categories[i].category == categories[j].category){
          categories[i].amount.push(parseInt(categories[j].amount))
          removeDuplicates.push(j)
        }
      }
    }

    removeDuplicates.sort(function(a, b){return a - b})
    for (let i=removeDuplicates.length-1; i>=0; i--){
      categories.splice(removeDuplicates[i],1)
    }

    categories.forEach( category => category.amount.length > 0 ? this.calculateCateogrySum(category.amount) : null)

    return (
      <div>
        {categories.map( category => <div>{category.category}: {category.amount}</div> )}
      </div>
    )
  }
    
  calculateCateogrySum = (arrayOfAmts) => {
    const sum = arrayOfAmts.reduce((a,b) => a+b,0)
    arrayOfAmts[0] = sum
    arrayOfAmts.splice(1)
  }


  render() {

    let balanceColor
    this.totalAmtCalc() < 500 ? balanceColor = 'red' : balanceColor = 'green'

    return (
      <Router>
        <div className='container'>
          <div className='balance' style={{color: balanceColor}}>
            Total Balance: <br></br>
            {this.totalAmtCalc()}
          </div>
          
          <Route exact path="/operations">
            <Operations data={this.state.data} 
                      amountValue={this.state.amountValue} 
                      vendorValue={this.state.vendorValue} 
                      categoryValue={this.state.categoryValue} 
                      updateAmtValue={this.updateAmtValue}
                      updateVendorValue={this.updateVendorValue}
                      updateCategoryValue={this.updateCategoryValue}
                      updateTransactions={this.updateTransactions}/>
          </Route>
          
          <Route exact path="/">
            <Transactions data={this.state.data} deleteTransaction={this.deleteTransaction}/>
            <Link to='/operations'><button className='oprBtn'>Opertaions</button></Link>
          </Route>

          <Route exact path='/categories'>
            <Categories categories={this.retrieveCategories} />
          </Route>
          
          
        </div>
      </Router>
    )
  }
}

export default App