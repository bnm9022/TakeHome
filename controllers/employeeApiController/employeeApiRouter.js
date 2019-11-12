const express = require('express');
const router = express.Router();
const { deleteEmployee, getEmployee, listEmployee, insertEmployee, updateEmployee } = require('./employeeApiService');

router.get('/', listEmployee);
router.get('/:id', getEmployee);
router.post('/', insertEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
