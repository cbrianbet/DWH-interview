const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const jwt = require("jsonwebtoken");
const { decode } = require('../middlewares/jwt')

//hospital
router.get("/add/patient", decode, dataController.addPatient);
router.post("/push/monthly", decode, dataController.pushMonthly);
router.post("/get/facilities", decode, dataController.facilities);
router.get("/get/pushed", decode, dataController.getPushed);

//admin


module.exports = router;
