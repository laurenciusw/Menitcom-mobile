const { Category, sequelize, User, Post } = require("../models");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    const { name } = req.body;
    const { id } = req.params;

    try {
      await Category.update({ name }, { where: { id } });

      res.status(200).json({ message: "Success edit category" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      await Category.destroy({ where: { id } });

      res.status(200).json({ message: "Success delete category" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
