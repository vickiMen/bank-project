// Server setup
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require(`path`)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'node_modules')))


const port = 3002
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})

// Mongoose setup
const mongoose = require('mongoose')
const DB_URL = `mongodb://localhost/bankDB`

const connectionOptions = {
        // poolSize: 20,
        socketTimeoutMS: 0,
        connectTimeoutMS: 0,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
}

mongoose.connect(DB_URL, connectionOptions, (err) => {
    if (err) {
        console.log(err.message)
    }
})


const Transaction = require('./transactionSchema')

//dbSetup for the first time and them comment out
const dbSetup = async function() {
    const dbPromises = []
    const data =  [
        { id:0, amount: 3200, vendor: "Elevation", category: "Salary" },
        { id:1, amount: -7, vendor: "Runescape", category: "Entertainment" },
        { id:2, amount: -20, vendor: "Subway", category: "Food" },
        { id:3, amount: -98, vendor: "La Baguetterie", category: "Food" }
    ]

    const dbData = data.map( d => new Transaction({
        amount: d.amount,
        vendor: d.vendor,
        category: d.category
    }))
    
    dbData.forEach( d => {
        dbPromises.push(
            d.save( function( err, data){
                if(err){
                    console.log()
                }
                else {
                    console.log(data)
                }
            }))
        })
    
        await Promise.all(dbPromises)
    }

// dbSetup()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})


app.get('/transactions', async function (req, res) {
    const data = await Transaction.find({})
    res.send(data)
})

app.post('/transaction', async function (req, res) {
    const newTransaction = new Transaction(req.body)
    await newTransaction.save()
    res.send(newTransaction)
})

app.delete('/transaction/:id', async function (req, res) {
    await Transaction.findOneAndDelete({ _id: req.params.id })
    res.send('transaction was deleted successfully')
})

