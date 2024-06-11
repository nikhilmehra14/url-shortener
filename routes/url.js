const express = require("express");
const {
  generateNewShortURL,
  getAnalytics,
  getRedirect,
  getTest,
} = require("../controllers/url");
const router = express.Router();

router.post("/", generateNewShortURL);
router.get("/:shortId", getRedirect);
router.get("/analytics/:shortId", getAnalytics);
router.get("/testing/test", getTest);

module.exports = router;
