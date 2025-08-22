const MongoDB = require("mongodb").MongoClient;
const URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;
const DEV_URI = process.env.DEV_DB_URI; 

const initDB = async () => {
  try {
    const db = await MongoDB.connect(DEV_URI);
    if (!db) {
      throw new Error({
        message: "Failed to connect to DB",
        status: 500,
      });
    } else {
      return {
        db,
        message: "Successfully connected to DB",
        status: 200,
      };
    }
  } catch (error) {
    return error;
  }
};

const getDB = async () => {
  try {
    const connection = await MongoDB.connect(DEV_URI);
    const db = connection.db(DB_NAME);
    if (!db) {
      throw new Error({
        message: `Failed to connect to ${DB_NAME}`,
        status: 500,
      });
    } else {
      return db;
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  initDB,
  getDB,
};
