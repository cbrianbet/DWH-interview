const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const jwt = require("jsonwebtoken");
const { decode } = require('../middlewares/jwt')

//hospital
router.get("/add/patient", dataController);
router.post("/push/monthly", dataController);
router.post("/get/facilities", dataController);
router.get("/get/pushed", dataController);

//admin


module.exports = router;
