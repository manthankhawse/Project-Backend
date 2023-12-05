const express = require('express');
const router = express.Router(); 
const {signup, login , logout , getProfile , addEmail} = require('../controllers/userControllers.js');

router.get("/profile/:username" , getProfile);
router.post("/signup" , signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/addEmail/:username" , addEmail);

module.exports = router