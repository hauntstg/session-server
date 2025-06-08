const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin");

router.post("/login", adminControllers.postLogin);

router.post("/logout", adminControllers.postLogout);

router.get("/data", adminControllers.getData);

module.exports = router;
