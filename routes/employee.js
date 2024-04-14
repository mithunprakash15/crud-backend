
const express = require('express');
const router = express.Router();
const { createEmployee, getAllEmployees, viewEmployee, updateEmployee, deleteEmployee, login, changePassword  } = require('../controllers/employee');


router.post('/login', login);
router.post('/change-password', changePassword);
router.post('/', createEmployee);
router.get('/', getAllEmployees);
router.get('/employee', viewEmployee);
router.put('/employee', updateEmployee);
router.delete('/employee', deleteEmployee);

module.exports = router;
