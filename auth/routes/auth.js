const express = require('express');

const router = express.Router();

// middlewares

const {erroHandler} = require('../middlewares/error-handler')
// controllers

router.post('/users/create', (req, res) => {
    res.send(" Create user")

});
router.get('/users', (req, res) => {
    throw new Error('Hitted wrong')
});
router.put('/users/update-user/:_id', (req, res) => {
    res.send(" Update user")
});
router.post('/users/current-user', (req, res) => {
    res.send(" Current user")
});
router.delete('/users/delete-user/:_id', (req, res) => {
    res.send(" Delete user")
});
module.exports = router;