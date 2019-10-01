const BaseRepository = require('./base.repository');

const { StepModel } = require('../models/index');

class StepRepository extends BaseRepository {
  getByRecipeId(recipeId) {
    return this.model.findAll({ 
      where: { recipeId } 
    });
  }
}

module.exports = new StepRepository(StepModel);
