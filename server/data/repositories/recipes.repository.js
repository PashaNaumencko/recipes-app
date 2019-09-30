const BaseRepository = require('./base.repository');

const { RecipeModel, StepModel } = require('../models/index');

class RecipeRepository extends BaseRepository {
  findOne(where) {
    return this.model.findOne({ 
      where,
      order: [[StepModel, 'createdAt', 'DESC']],
      include: [
        {
          model: StepModel,
        }, 
        {
          model: this.model,
          as: 'previousVersions'
        }
      ]
    });
  }
}

module.exports = new RecipeRepository(RecipeModel);
