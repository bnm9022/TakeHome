const mongoose = require('mongoose');
const moment = require("moment-timezone")
const { getJoke, getQuote, isValidDate, isValidFormat } = require('../helper');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First name cannot be empty'
    },
    lastName: {
        type: String,
        required : 'Last name cannot be empty'
    },
    hireDate: {
        type: Date,
        required: 'Hire date cannot be empty and have to be in YYYY-MM-DD format'
    },
    role: {
        type: String,
        enum: ['CEO', 'VP', 'MANAGER', 'LACKEY'],
        uppercase : true,
        trim : true,
        required: 'Role cannot be empty and have to be CEO, VP, MANAGER, or LACKEY'
    },
    favoriteQuote:{
        type: String
    },
    favoriteJoke:{
        type: String
    }
});

employeeSchema.path('hireDate').validate((val) => {
    return isValidFormat(val);
}, 'Please enter date in YYYY-MM-DD format');

employeeSchema.path('hireDate').validate((val) => {
    return isValidFormat(val) && isValidDate(val);
}, 'Please enter a date before today');

employeeSchema.path('hireDate').get((val) => {
    return val ? moment(val).tz('GMT').format('YYYY-MM-DD') : '';
});

mongoose.model('Employee', employeeSchema);
