import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    }
  },

  down: async (queryInterface: QueryInterface) => {
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
    }
  }
};
