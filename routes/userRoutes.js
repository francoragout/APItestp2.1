const express = require('express');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
