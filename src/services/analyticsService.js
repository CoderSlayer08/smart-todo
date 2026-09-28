const db = require('../config/mockDb');

const getAnalyticsData = async (userId) => {
  const tasks = db.tasks.filter(t => t.user_id === userId);
  
  const now = new Date();
  let completed = 0, pending = 0, inProgress = 0, overdue = 0;
  let categoryMap = {}, priorityMap = {}, weeklyMap = {};
  
  // Last 7 days init for weekly map
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    weeklyMap[d.toISOString().split('T')[0]] = 0;
  }

  tasks.forEach(task => {
    // Status counts
    if (task.status === 'completed') completed++;
    else if (task.status === 'pending') pending++;
    else if (task.status === 'in_progress') inProgress++;
    
    // Overdue check
    if (task.due_date && new Date(task.due_date) < now && task.status !== 'completed') {
      overdue++;
    }
    
    // Categories
    const cat = task.category || 'Other';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    
    // Priorities
    const prio = task.priority || 'medium';
    priorityMap[prio] = (priorityMap[prio] || 0) + 1;
    
    // Weekly completions
    if (task.status === 'completed' && task.completed_at) {
      const compDateStr = new Date(task.completed_at).toISOString().split('T')[0];
      if (weeklyMap[compDateStr] !== undefined) {
        weeklyMap[compDateStr]++;
      }
    }
  });
  
  const total = tasks.length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;
  
  return {
    summary: { total, completed, pending, inProgress, overdue, completionRate },
    status: [
      { name: 'Completed', value: completed },
      { name: 'Pending', value: pending },
      { name: 'In Progress', value: inProgress }
    ],
    category: Object.keys(categoryMap).map(k => ({ name: k, value: categoryMap[k] })),
    priority: Object.keys(priorityMap).map(k => ({ name: k, value: priorityMap[k] })),
    weekly: Object.keys(weeklyMap).map(k => ({ date: k, count: weeklyMap[k] })),
    rawTasks: tasks
  };
};

module.exports = {
  getAnalyticsData
};
