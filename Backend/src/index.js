const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');  
//imports
const Analisis = require('./routes/Analisis');

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({  
    extended: true
}));


//routes
app.use(Analisis);

//run
app.listen(3080, function () {
    console.log('listen port 3080!');
});



