const express = require("express");
const { postJob, getJobs } = require("../controllers/jobController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, postJob);
router.get("/", getJobs);

module.exports = router;
