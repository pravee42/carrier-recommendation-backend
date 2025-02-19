const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const { saveData, getData } = require("../controllers/formController");

const router = express.Router();

router.post("/submit", authenticate, saveData);
router.post("/get", getData);

module.exports = router;
