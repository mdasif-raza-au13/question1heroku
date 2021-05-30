const express = require('express');
const userRoutes = require('./routes/user.js');
const db = require('./config/mongo-db.js')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 1101;

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Welcome to node-express')
});

app.use('/api',userRoutes);

app.listen(port,()=>{
    console.log(`listenin on http://localhost:${port}`);
});