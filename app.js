const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/signup.html")
});

app.post('/', (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const listID = process.env.LIST_ID;
    const authKey = process.env.API_KEY;
    const url = `https://us2.api.mailchimp.com/3.0/lists/${listID}`
    const options = {
        method: "POST",
        auth: `naina:${authKey}`
    }

    const request = https.request(url, options, function(response){
       response.on("data", function(data){
           console.log(JSON.parse(data));
       })
    })
    request.write(jsonData);
    request.end();
});

app.listen('5000',() => {
    console.log("Server has started on port 5000");
})