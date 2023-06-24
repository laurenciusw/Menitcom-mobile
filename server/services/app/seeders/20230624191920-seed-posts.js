"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../db.json").Post;
    data.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Posts", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null);
  },
};
