"use strict";
const { Model } = require("sequelize");
const { createSlug } = require("../helpers/slug");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Post.hasMany(models.Tag, {
        foreignKey: "postId",
        as: "tags",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title is required" },
          notEmpty: { msg: "Title is required" },
        },
      },
      slug: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Content is required" },
          notEmpty: { msg: "Content is required" },
        },
      },
      imgUrl: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Category is required" },
          notEmpty: { msg: "Category is required" },
        },
      },
      userMongoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Author is required" },
          notEmpty: { msg: "Author is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  Post.beforeCreate((post) => {
    post.slug = createSlug(post.title);
  });
  return Post;
};
