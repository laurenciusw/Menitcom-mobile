"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../db.json").Category;
    data.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null);
  },
};
