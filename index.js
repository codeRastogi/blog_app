const express = require('express');
                require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

const blog = require('./routes/blog');

app.use("/api/v1", blog);

const connectWithDb = require('./config/database');

connectWithDb();

app.listen(PORT ,() => {
    console.log(`Listening on ${PORT}`);
    
})

app.get('/', (req, res) => {
    res.send(
        `<h1> this my is my home page </h1>`
    )
    
})