module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
    .then(() => queryInterface.sequelize.transaction(transaction => Promise.all([
      queryInterface.createTable('ingredients', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        recipeId: {
          references: {
            model: 'recipes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          type: Sequelize.UUID,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction })
    ]))),
  down: queryInterface => queryInterface.sequelize.transaction(transaction => Promise.all([
    queryInterface.dropTable('ingredients', { transaction }),
  ]))
};

