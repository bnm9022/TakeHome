require('./employee.model');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDatabase', {useNewUrlParser: true }, (err) => {
    if (!err) { 
    	console.log('MongoDB Connected Successfully') 
    } else { 
    	console.log('Error in Database connection:' + err) 
    }
})
