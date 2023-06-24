const MongoDBconnection = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");

class UserController {
  //get all user
  static async allUser(req, res) {
    try {
      const { db } = MongoDBconnection;
      const users = await db
        .collection("users")
        .find()
        .project({ password: 0 })
        .toArray();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  //find user by id
  static async findById(req, res) {
    try {
      const { db } = MongoDBconnection;
      const { id } = req.params;
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  //register
  static async newUser(req, res) {
    try {
      const { db } = MongoDBconnection;
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };
      const user = await db.collection("users").insertOne(data);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  //delete
  static async delete(req, res) {
    try {
      const { db } = MongoDBconnection;
      const { id } = req.params;
      const result = await db
        .collection("users")
        .deleteOne({ _id: new ObjectId(id) });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
