const express = require("express");
const {
  generateNewShortURL,
  getAnalytics,
  getRedirect,
} = require("../controllers/url");
const router = express.Router();

router.post("/", generateNewShortURL);
router.get("/:shortId", getRedirect);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
