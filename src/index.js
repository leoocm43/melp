const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const fs = require("fs");
const fastcsv = require("fast-csv");
const {Pool} = require('pg')

const connectionString = "postgres://prieupafdleajx:0ed0f64c542b224fbba962dd21ebe0b193cb8c18d776159677903e32d40ef3e7@ec2-3-220-98-137.compute-1.amazonaws.com:5432/dfvst9inmj8317"

const pool = new Pool({
    connectionString,
})


//Unomment below if database does not exist
//pool.query('CREATE DATABASE restaurants')
pool.query('CREATE TABLE IF NOT EXISTS restaurant( id TEXT PRIMARY KEY, rating INTEGER, name TEXT, site TEXT, email TEXT,phone TEXT,street TEXT,city TEXT,state TEXT,lat FLOAT, lng FLOAT )')


let stream = fs.createReadStream("./csv/restaurants.csv");
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
        csvData.push(data);
    })
    .on("end", function() {
        // remove the first line: header
        csvData.shift();

        const query =
        "INSERT INTO restaurant (id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

        pool.connect((err, client, done) => {
        if (err) throw err;

        try {
            csvData.forEach(row => {
            client.query(query, row, (err, res) => {
                if (err) {
                console.log(err.stack);
                } else {
                console.log("inserted " + res.rowCount + " row:", row);
                }
            });
            });
        } finally {
            done();
        }
        });
    });

stream.pipe(csvStream);






const app = express();

// middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Routes
app.use('/', require('./routes/index'));

//app.listen(3000);
//console.log('Server on port', 3000);