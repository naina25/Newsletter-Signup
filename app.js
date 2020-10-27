const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const app = express();


app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/signup.html")
});


app.listen('5000',() => {
    console.log("Server has started on port 5000");
})