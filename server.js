//module packages required
const express = require('express');
const apiRoutes = require('./routes/apiRoutes/notes.js');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();
//both these middleware functions are needed for every server set up to accept POST data
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//use this middleware every time we create a server that will serve a front end as well as JSON data
//to connect all the front end pages ie. javascript, css
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});