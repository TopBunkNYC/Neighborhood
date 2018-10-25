const router = require('express').Router();
const controller = require('../controllers/main');

router.get('/', (req, res) => {res.send('Hello, world')})
router.get('/listing', (req, res) => {res.send('Hello, listing')})
router.get('/listingdata', controller.getListingData)

module.exports = router;