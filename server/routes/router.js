const router = require('express').Router();
const controller = require('../controllers/main');

router.get('/', (req, res) => {res.send('Hello, world')})
router.get('/listing', (req, res) => {res.send('Hello, listing')})
router.get('/listingdata', controller.getListingData)
router.get('/neighborhooddata', controller.getNeighbData)
router.get('/landmarkdata', controller.getLandmarkData)

module.exports = router;