const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {decode} = require("../middlewares/jwt");

router.post("/register", userController.add);
router.get("/user", decode, userController.user);
router.put("/", decode, userController.update);
router.post("/login", userController.login);

module.exports = router;
