const express = require('express');
const { sendSMS, sendMail } = require('../controllers/alertControllers.js');
const router = express.Router();

router.post("/sendMail" , sendMail)
router.get("/sendSMS" ,sendSMS);


module.exports = router