const fs = require('fs');
const path = require('path');

// Resolve the path to the storage file in the same lib folder.
const storageFile = path.resolve(__dirname, 'antiNewsSettings.json');

// Load settings from the JSON file.
function loadSettings() {
  if (!fs.existsSync(storageFile)) {
    fs.writeFileSync(storageFile, JSON.stringify({}), 'utf8');
  }
  try {
    const data = fs.readFileSync(storageFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading antitag settings:", err);
    return {};
  }
}

// Save settings to the JSON file.
function saveSettings(settings) {
  try {
    fs.writeFileSync(storageFile, JSON.stringify(settings, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing antitag settings:", err);
  }
}

module.exports = { loadSettings, saveSettings };