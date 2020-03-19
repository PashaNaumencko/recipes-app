const BaseRepository = require('./base.repository');
const Sequelize = require('sequelize');

const { IngredientModel } = require('../models/index');

class IngredientRepository extends BaseRepository {
  getAll() {
    // return this.model.aggregate('name', 'DISTINCT', { plain: false });
    return this.model.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']],
    })
  }
}

module.exports = new IngredientRepository(IngredientModel);
