const express = require('express')
const Data = require('./data.json')

const app = express()

app.get('/', (req, res) => {
    res.json(Data)
})

app.listen(4000, ()=>{
    console.log("Listening on port 4000");
})