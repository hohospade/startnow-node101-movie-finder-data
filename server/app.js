var express = require('express');
var morgan = require("morgan");
var axios = require("axios");
var app = express();
var fs = require("fs");
var path = require("path");
var request = require("request");

const database = {
    url: '',
    data: ''
}

app.use(morgan("dev"));




app.get("/", function (req, res) {
    
    //if req.url is the same as database.url, send database.data
    if (req.url === database.url) {
        res.send(database.data)
    } else {
        axios
            .get(`http://www.omdbapi.com${req.url}&apikey=8730e0e`)
            .then(function (response) {
                database.url = req.url;
                database.data = response.data;

                res.json(response.data)
            })
            .catch(function (error) {
                console.log(error.message);
            })
    }
})

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter





module.exports = app;





//TO DO LIST
//express, morgan and axios installed. DONE
//Server should log each request using morgan's dev format. DONE
//Server should indicate when it is listening, and on which port. DONE
//Server should respond to GET requests to /?i=tt3896198 with movie data.
//Server should respond to GET requests to /?i=tt3896198 with movie data without fetching from the OMDb api.
//Server should also respond to GET requests to /?t=baby%20driver with movie data.
//Server should also respond to GET requests to /?t=baby%20driver with movie data without fetching from the OMDb api.
//All tests should pass.

/*app.get("/", function (req, res) {
    res.send("test page");
});

app.get("/search", function (req,res){
    let key = req.query.i
    if (database[key]) {
        res.json(database[key])
    }
    axios
        .get(`http://omdbapi.com/?i=${key}&apikey=8730e0e`)
        .then(response => {
            database[key] = response.data
            res.json(response.data)
        })
})*/