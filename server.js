const express = require('express');
require('dotenv').config();
const path = require('path');
const routes = require('./routers/routes');

const cors = require('cors');

const app = express()




app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(express.static('public', {
    maxAge: '30d' // Cache for 30 days
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', routes)


app.listen(3000, () => {
    console.log(`------------------------------------------`),
        console.log(`USER SIDE   :  http://localhost:3000/home`),
        console.log(`ADMIN SIDE  :  http://localhost:3000/admin`)
    console.log(`------------------------------------------`)
})