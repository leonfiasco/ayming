const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('hhhh');
});

router.post('/add-post', (req, res, next) => {});

module.exports = router;
