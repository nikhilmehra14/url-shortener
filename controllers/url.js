const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  const shortID = shortid();
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "URL is required." });

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).json({ id: shortID });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  if (!result) return res.status(400).json({ error: "URL doesn't exist." });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function getRedirect(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) return res.status(400).json({ error: "URL doesn't exist." });
  return res.redirect(entry.redirectURL);
}

async function getTest(req, res) {
  const allUrls = await URL.find({});
  return res.render("home", { urls: allUrls });
}

module.exports = {
  generateNewShortURL,
  getAnalytics,
  getRedirect,
  getTest,
};
