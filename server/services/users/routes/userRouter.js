const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.allUser);

router.post("/register", UserController.newUser);

router.get("/:id", UserController.findById);

router.delete("/:id", UserController.delete);

module.exports = router;
