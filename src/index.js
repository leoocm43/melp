const express = require('express');
const { use } = require('./routes');
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Define Routes
app.use(require('./routes/index'))

app.listen(3000)
console.log("Server on port 3000")