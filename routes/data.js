const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const jwt = require("jsonwebtoken");
const { decode } = require('../middlewares/jwt')

//hospital
router.post("/add/patient", decode, dataController.addPatient);
router.post("/push/monthly", decode, dataController.pushMonthly);
router.get("/get/facilities", decode, dataController.facilities);
// router.get("/get/pushed", decode, dataController.getPushed);

//admin
router.get("/get/pushed", decode,dataController.getPushedAdmin);
router.get("/", decode, dataController.getPushed);


module.exports = router;
