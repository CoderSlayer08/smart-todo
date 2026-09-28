const analyticsService = require('../services/analyticsService');
const productivityService = require('../services/productivityService');
const { successResponse } = require('../utils/response');

const getSummary = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalyticsData(req.user.id);
    return successResponse(res, data.summary, 'Summary analytics retrieved');
  } catch (error) { next(error); }
};

const getStatus = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalyticsData(req.user.id);
    return successResponse(res, data.status, 'Status analytics retrieved');
  } catch (error) { next(error); }
};

const getWeekly = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalyticsData(req.user.id);
    return successResponse(res, data.weekly, 'Weekly analytics retrieved');
  } catch (error) { next(error); }
};

const getCategory = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalyticsData(req.user.id);
    return successResponse(res, data.category, 'Category analytics retrieved');
  } catch (error) { next(error); }
};

const getPriority = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalyticsData(req.user.id);
    return successResponse(res, data.priority, 'Priority analytics retrieved');
  } catch (error) { next(error); }
};

const getProductivitySuggestions = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalyticsData(req.user.id);
    const suggestions = productivityService.generateSuggestions(data);
    return successResponse(res, suggestions, 'Productivity suggestions retrieved');
  } catch (error) { next(error); }
};

const getAllAnalytics = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalyticsData(req.user.id);
    const suggestions = productivityService.generateSuggestions(data);
    return successResponse(res, { ...data, suggestions, rawTasks: undefined }, 'All analytics retrieved');
  } catch (error) { next(error); }
};

module.exports = {
  getSummary,
  getStatus,
  getWeekly,
  getCategory,
  getPriority,
  getProductivitySuggestions,
  getAllAnalytics
};
