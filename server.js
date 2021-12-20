const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');
const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

const routes = require('./routes');
routes(app);


// daftarkan router dari index
app.use('/auth', require('./middleware'));

 app.listen(port,() =>{
    console.log('server started on port ' + port)
 });