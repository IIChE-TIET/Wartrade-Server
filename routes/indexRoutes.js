const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    console.log('Dashboard');
    res.send(req.user);
});

module.exports = router;