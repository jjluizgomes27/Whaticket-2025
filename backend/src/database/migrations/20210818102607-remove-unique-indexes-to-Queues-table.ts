import { QueryInterface } from "sequelize";

const removeConstraintIfExists = async (
  queryInterface: QueryInterface,
  tableName: string,
  constraintName: string
) => {
  try {
    await queryInterface.removeConstraint(tableName, constraintName);
  } catch (error) {
    // MySQL pode não criar a constraint com esse nome. Ignora quando não existir.
  }
};

const removeIndexIfExists = async (
  queryInterface: QueryInterface,
  tableName: string,
  indexName: string
) => {
  try {
    await queryInterface.removeIndex(tableName, indexName);
  } catch (error) {
    // Ignora quando o índice não existir.
  }
};

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await removeConstraintIfExists(queryInterface, "Queues", "Queues_color_key");
    await removeConstraintIfExists(queryInterface, "Queues", "Queues_name_key");
    await removeIndexIfExists(queryInterface, "Queues", "Queues_color_key");
    await removeIndexIfExists(queryInterface, "Queues", "Queues_name_key");
  },

  down: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.addConstraint("Queues", ["color"], {
        name: "Queues_color_key",
        type: "unique"
      });
    } catch (error) {}

    try {
      await queryInterface.addConstraint("Queues", ["name"], {
        name: "Queues_name_key",
        type: "unique"
      });
    } catch (error) {}
  }
};
