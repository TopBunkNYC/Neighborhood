const router = require('express').Router();
const controller = require('../controllers/main');

router.get('/', (req, res) => {res.send('Hello, world')})

module.exports = router;