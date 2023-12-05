const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const { postTemp,postECG,postHeartRate,postOxy } = require('../controllers/dataControllers.js');
const router = express.Router();

router.post("/heart-rate/:userId" , postHeartRate)
router.post("/ecg-readings/:userId" , postECG);
router.post("/oxygen/:userId", postOxy);
router.post("/temp/:userId", postTemp);

module.exports = router