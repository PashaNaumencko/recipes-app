module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
    .then(() => queryInterface.sequelize.transaction(transaction => Promise.all([
      queryInterface.createTable('recipes', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        title: {
          type: Sequelize.STRING
        },
        imgUrl: {
          type: Sequelize.STRING
        },
        ingredients: {
          type: Sequelize.TEXT
        },
        previousVersionId: {
          type: Sequelize.UUID
        },
        rootVersionId: {
          type: Sequelize.UUID
        },
        calorificValue: {
          type: Sequelize.INTEGER
        },
        duration: {
          type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction }),
      queryInterface.createTable('steps', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction })
    ]))),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.dropTable('recipes', { transaction }),
      queryInterface.dropTable('steps', { transaction })
    ]))
};
