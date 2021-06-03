const express = require('express');

const router = express.Router();

// middlewares
const {authCheck} = require("../middlewares/auth-middleware")

// controllers
const {createOrUpdateUser, currentUser, deleteUser, createOrUpdateUserProfile, loadUsers} = require("../controllers/authController")

router.post('/users/create', authCheck, createOrUpdateUser)
router.get('/users', authCheck, loadUsers)
router.put('/users/update-user/:_id', authCheck, createOrUpdateUser)
router.post('/users/current-user', authCheck, currentUser )
router.delete('/users/delete-user/:_id', authCheck, deleteUser )
router.post('/current-user/profile', authCheck, createOrUpdateUserProfile);
module.exports = router;