const mongoose = require('mongoose');

const URL = 'mongodb+srv://admin:1234@cluster0.l1ira.mongodb.net/cvraman?retryWrites=true&w=majority';

mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true});