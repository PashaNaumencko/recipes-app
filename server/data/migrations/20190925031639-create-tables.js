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
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        imgUrl: {
          allowNull: false,
          type: Sequelize.STRING
        },
        ingredients: {
          type: Sequelize.TEXT
        },
        previousVersionId: {
          type: Sequelize.UUID
        },
        complexity: {
          allowNull: false,
          type: Sequelize.STRING
        },
        calorificValue: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        duration: {
          allowNull: false,
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
