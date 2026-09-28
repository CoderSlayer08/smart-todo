const express = require('express');
const { 
  getSummary, getStatus, getWeekly, getCategory, getPriority, getProductivitySuggestions, getAllAnalytics
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/summary', getSummary);
router.get('/status', getStatus);
router.get('/weekly', getWeekly);
router.get('/category', getCategory);
router.get('/priority', getPriority);
router.get('/suggestions', getProductivitySuggestions);
router.get('/', getAllAnalytics); // Get everything at once

module.exports = router;
