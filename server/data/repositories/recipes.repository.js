const Mongoose = require('mongoose');
const BaseRepository = require('./base.repository');
const { RecipeModel } = require('../models');

class RecipeRepository extends BaseRepository {
  getAllIngredients() {
    return this.model.find()
      .select({ _id: 1, ingredients: 1 })
      .distinct('ingredients');
  }
}

module.exports = new RecipeRepository(RecipeModel);
