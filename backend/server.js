const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors');

// Express app
const app = express()

//import routes 
const feedbackRoutes = require('./routes/feedback');
const CustomerRoutes = require('./routes/customer');

app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use(feedbackRoutes);
app.use(CustomerRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://vinuja:vinuja@jwelleryshopsystem.vung6hx.mongodb.net/?retryWrites=true&w=majority&appName=JwelleryShopSystem';

mongoose.connect(DB_URL)
.then(() =>{
    console.log('DB connected')
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}!`)
})
