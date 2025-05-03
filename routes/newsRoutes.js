const express = require("express");
const router = express.Router();
const News = require("../models/News");

// Post news item
router.post("/", async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "News creation failed" });
  }
});

// Get all news
router.get("/", async (req, res) => {
  try {
    const newsList = await News.find().sort({ publishDate: -1 });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
