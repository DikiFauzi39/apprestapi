const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes');
routes(app);

 app.listen(port,() =>{
    console.log('server started on port ' + port)
 });