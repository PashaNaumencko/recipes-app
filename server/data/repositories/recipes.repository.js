const BaseRepository = require('./base.repository');

const { RecipeModel, StepModel } = require('../models/index');

class RecipeRepository extends BaseRepository {
  getByTitle(title) {
    return this.model.findOne({ 
      where: { title } 
    });
  }
}

module.exports = new RecipeRepository(RecipeModel);
