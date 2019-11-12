const moment = require('moment');
const { helpers } = require('handlebars-helpers');
const mongoose = require('mongoose');
const Request = require("request");
const Employee = mongoose.model('Employee');
const { getJoke, getQuote, isValidDate, handleValidationError } = require('../../helper');

module.exports = {
    listEmployee: function(req, res) {
        Employee.find((err, docs) => {
            docs.forEach(doc => {
                doc.hireDate = moment(doc.hireDate).utc().format("YYYY-MM-DD");
            });
            if (!err) {
                res.render("employees/list", {
                    list: docs
                });
            } else {
                console.log('Error when list employee:' + err);
            }
        });
    },
    getEmployee: function(req, res) {
        Employee.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render("employees/createOrEdit", {
                    viewTitle: "Update employee",
                    employee: doc
                });
            }
        });
    },
    insertEmployee: async function(req, res) {
        var employee = new Employee();

        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        if(isValidDate(req.body.hireDate)) {  
            employee.hireDate = moment.utc(req.body.hireDate).format();
        } else {
            employee.hireDate = null;
        }
        employee.role = req.body.role;
        employee.favoriteJoke = await getJoke();
        employee.favoriteQuote = await getQuote();
        employee.save((err, doc) => {
            if (!err) {
                res.redirect('employees/list');
            } else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("employees/createOrEdit", {
                        viewTitle: "Create Employee",
                        employee: req.body
                    });
                } else {
                    console.log('Error when insert employee:' + err);
                }
            }
        });
    },
    updateEmployee: function(req, res) {
        if(!isValidDate(req.body.hireDate)) {
            req.body.hireDate = null;
        }
        var opts = { runValidators: true, new: true };
        Employee.findOneAndUpdate({ _id: req.body._id }, req.body, opts, (err, doc) => {
            if (!err) { 
                res.redirect('employees/list'); 
            } else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("employees/createOrEdit", {
                        viewTitle: 'Update employee',
                        employee: req.body
                    });
                } else {
                    console.log('Error when update employee:' + err);
                }
            }
        });
    },
    deleteEmployee: function(req, res) {
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                res.redirect('/employees/list');
            } else { 
                console.log('Error when delete employee:' + err); 
            }
        });
    }
};
