const MongoDBconnection = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const User = require("../models/user");

class UserController {
  //get all user
  static async allUser(req, res) {
    try {
      const { db } = MongoDBconnection;
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  //find user by id
  static async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findbyId(id);
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
      const user = await User.createUser(data);
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
      const result = await User.deleteUser(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
