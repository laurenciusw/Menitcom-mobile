const { MongoClient } = require("mongodb");

class MongoDBconnection {
  static db = false;

  static async connect() {
    let mongoClient;
    let uri = process.env.MONGODB_URL;

    try {
      mongoClient = new MongoClient(uri);
      console.log("Connecting to MongoDB Atlas cluster...");
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB Atlas!");
      this.db = mongoClient.db("P3-C02");
      return "Success";
    } catch (error) {
      console.error("Connection to MongoDB Atlas failed!", error);
      throw error;
    }
  }
}

module.exports = MongoDBconnection;
