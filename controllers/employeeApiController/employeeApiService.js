const moment = require('moment');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Request = require('request-promise');
const { getJoke, getQuote, isValidDate } = require('../../helper');

module.exports = {
    listEmployee: function(req, res) {
        Employee.find((err, docs) => {
            if (!err) {
                res.json(docs);
            } else {
                res.status(500).send(`Error when list employee: ${err}`);
                console.log(`Error when list employee: ${err}`);
            }     
        });
    },
    getEmployee: function(req, res) {
        Employee.findById(req.params.id, (err, doc) => {
            if (!err) {
              res.json(doc);
            } else {
                res.status(204).send(`Error when get employee with Id: ${req.params.id}. ${err}`);
                console.log(`Error when get employee with Id: ${req.params.id}. ${err}`);
            }
        });
    },
    insertEmployee: async function(req, res) {
        var employeeCollection = [];
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                empObj = req.body[key];

                var newEmpObj = new Employee();
                newEmpObj.firstName = empObj.firstName;
                newEmpObj.lastName = empObj.lastName;
                if(isValidDate(empObj.hireDate)) {  
                    newEmpObj.hireDate = moment.utc(empObj.hireDate).format();
                } else {
                    res.status(400).send('Please enter date in valid YYYY-MM-DD format');
                    return;
                }
                newEmpObj.role = empObj.role;
                newEmpObj.favoriteQuote = await getQuote();
                newEmpObj.favoriteJoke = await getJoke();
                employeeCollection.push(newEmpObj);
            }
        }

        Employee.insertMany(employeeCollection, (err, doc) => {
            if (!err) {
                res.send(`Employee(s) have been saved successfully`);
            } else {
                if (err.name == 'ValidationError') {
                    res.status(400).send(`Error when insert employee: ${err}`);
                } else {
                    res.status(500).send(`Error when insert employee: ${err}`);
                    console.log('Error when insert employee:' + err);
                }
            }
        });
    },
    updateEmployee: function(req, res) {
        if(!isValidDate(req.body.hireDate)) {
            res.status(400).send('Please enter date in valid YYYY-MM-DD format');
            return;
        }
        var opts = { runValidators: true, new: true };
        Employee.findOneAndUpdate({ _id: req.params.id }, req.body, opts, (err, doc) => {
            if (!err) {
                res.send(`Employee ${req.params.id} has been updated successfully`);
            } else {
                if (err.name == 'ValidationError') {
                    res.status(400).send(`Error when update employee with Id: ${req.params.id}. ${err}`);
                } else {
                    console.log('Error when update employee with Id:' + err);
                }
            }
        });
    },
    deleteEmployee: function(req, res) {
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                res.send(`Employee ${req.params.id} has been deleted successfully`);
            } else { 
                if (err.name == 'ValidationError') {
                    res.status(400).send(`Error when delete employee: ${req.params.id}. ${err}`);
                } else {
                    res.status(500).send(`Error when delete employee: ${req.params.id}. ${err}`);
                    console.log(`Error when delete employee: ${req.params.id}. ${err}`)};
                }
        });
    }
};
