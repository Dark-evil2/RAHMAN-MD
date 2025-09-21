const fs = require("fs");
const path = require("path");

const activityFile = path.join(__dirname, "activity.json");

// Load activity data
const loadActivity = () => {
  try {
    return JSON.parse(fs.readFileSync(activityFile, "utf8"));
  } catch (e) {
    return {};
  }
};

// Save activity data
const saveActivity = (data) => {
  fs.writeFileSync(activityFile, JSON.stringify(data, null, 2));
};

// Update activity count
const updateActivity = (group, user) => {
  let data = loadActivity();
  if (!data[group]) data[group] = {};
  if (!data[group][user]) data[group][user] = 0;
  data[group][user] += 1;
  saveActivity(data);
};

// Get sorted activity list
const getActivityList = (group) => {
  let data = loadActivity();
  if (!data[group]) return [];
  return Object.entries(data[group])
    .map(([user, count]) => ({ user, count }))
    .sort((a, b) => b.count - a.count);
};

module.exports = { updateActivity, getActivityList };