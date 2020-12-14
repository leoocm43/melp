const { Router } = require('express');
const router = Router();
const {getRestaurants, insertRest, getRestaurantsById, updateRest, deleteRest} = require('../controllers/restaurants')

router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' });
  });

router.get('/restaurants', getRestaurants)
router.post('/restaurants', insertRest)
router.get('/restaurants/:id', getRestaurantsById)
router.put('/restaurants/:id', updateRest)
router.delete('/restaurants/:id', deleteRest)


module.exports = router;