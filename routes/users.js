// routes/userRoutes.js
const express = require('express');
// const { getAllUsers, createUser } = require('../controllers/users.controller');
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/users.controller');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);  // corrected the dynamic parameter
router.post('/', createUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);



module.exports = router;
