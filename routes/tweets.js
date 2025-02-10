const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweet');

// 获取所有推文
router.get('/', (req, res) => {
  try {
    const tweets = Tweet.getAll();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个推文及其回复
router.get('/:id', (req, res) => {
  try {
    const tweet = Tweet.getById(parseInt(req.params.id));
    if (!tweet) {
      return res.status(404).json({ message: '推文未找到' });
    }
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 