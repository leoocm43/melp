const { Router } = require('express');
const router = Router();
const {getRestaurants, insertRest, getRestaurantsById, updateRest, deleteRest, getGeojson} = require('../controllers/restaurants')

router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Welcome to Melp API' });
  });

router.get('/restaurants', getRestaurants)
router.post('/restaurants', insertRest)
router.get('/restaurants/:id', getRestaurantsById)
router.put('/restaurants/:id', updateRest)
router.delete('/restaurants/:id', deleteRest)

//router.get('/restaurants/statistics?latitude=:x&longitude=:y&radius=:z', getGeojson)

module.exports = router;