const express            = require('express');
const cors               = require('cors');
const bodyParser         = require('body-parser');
const Dbconnection       = require('./services/Db');


const app                = express();

const userRoute          = require('./Routes/userRoute');
const productRoute       = require('./Routes/productRoute')
const salesHistoryRoute  = require('./Routes/orderRoutes');
const categoryRoute      = require('./Routes/categoryRoutes');
const regionRoute        = require('./Routes/regionRoutes');
const storeRoute         = require('./Routes/storeRouter');
const inventoryRoute     = require('./Routes/inventoryRouter');
const roleRoute          = require('./Routes/roleRouter');

const morgan             = require('morgan');

require('dotenv').config();
const PORT               = process.env.PORT || 5000;

Dbconnection();

app.use(cors());

//Middlewares
app.use(express.json());
app.use(bodyParser.json());  
app.use(morgan('dev'));

//Routes Middleware
app.use('/api/v1',userRoute);
app.use('/api/v2',productRoute);
app.use('/api/v3',salesHistoryRoute);
app.use('/api/v4',categoryRoute);
app.use('/api/v5',regionRoute);
app.use('/api/v6',storeRoute);
app.use('/api/v7',inventoryRoute);
app.use('/api/v8',roleRoute);


app.listen(PORT,()=>{
    console.log(`Server is Listening on ${PORT}`);
})

