const MongoDBconnection = require("../config/mongoConnection");

class UserController {
  static allUser(req, res) {
    const { db } = MongoDBconnection;
    console.log(db);
  }
}

module.exports = UserController;
