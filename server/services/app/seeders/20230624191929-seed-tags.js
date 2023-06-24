"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../db.json").Tags;
    data.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Tags", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags", null);
  },
};
