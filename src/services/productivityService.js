const analyticsService = require('../services/analyticsService');

const generateSuggestions = (analyticsData) => {
  const suggestions = [];
  const { summary, rawTasks } = analyticsData;
  
  if (summary.overdue > 3) {
    suggestions.push(`You currently have ${summary.overdue} overdue tasks. Consider reviewing their deadlines and breaking large tasks into smaller steps.`);
  } else if (summary.overdue > 0) {
    suggestions.push(`You have ${summary.overdue} overdue task(s). Try to clear them out today!`);
  }
  
  const highPriorityPending = rawTasks.filter(t => (t.priority === 'high' || t.priority === 'urgent') && t.status !== 'completed');
  if (highPriorityPending.length > 2) {
    suggestions.push(`You have several high-priority tasks pending. Consider completing the most urgent one first.`);
  }

  if (summary.completionRate > 80) {
    suggestions.push(`Your completion rate is ${summary.completionRate}%. Great job keeping up with your tasks!`);
  }
  
  if (summary.pending > 10) {
    suggestions.push(`You have ${summary.pending} pending tasks. Try choosing your top 3 priorities for today.`);
  }
  
  // Fallback
  if (suggestions.length === 0) {
    suggestions.push(`You're doing great! Keep up the good work and add new tasks when you're ready.`);
  }
  
  return suggestions;
};

module.exports = {
  generateSuggestions
};
