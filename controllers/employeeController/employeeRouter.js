const express = require('express');
const router = express.Router();
const { deleteEmployee, getEmployee, listEmployee, insertEmployee, updateEmployee } = require('./employeeService');

router.get('/', (req, res) => {
    res.render("employees/createOrEdit", {
        viewTitle: "Create employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == ''){
        insertEmployee(req, res);
    } else {
        updateEmployee(req, res);
    }
});

router.get('/list', listEmployee);
router.get('/:id', getEmployee);
router.get('/delete/:id', deleteEmployee);

module.exports = router;