const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

const readDB = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with initial structure
    const initialDB = {
      users: [],
      courses: [],
      enrollments: [],
      activities: []
    };
    await fs.writeFile(dbPath, JSON.stringify(initialDB, null, 2));
    return initialDB;
  }
};

const writeDB = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

module.exports = {
  readDB,
  writeDB
}; 