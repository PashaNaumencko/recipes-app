  
const Sequelize = require('sequelize');
const BaseRepository = require('./base.repository');

const { RecipeModel, StepModel } = require('../models/index');

const { Op } = Sequelize;

class RecipeRepository extends BaseRepository {
  getAllVersions(id) {
    return this.model.findAll({ 
      where: { rootVersionId: id },
      order: [
        [StepModel, 'createdAt', 'ASC'],
        [StepModel, 'updatedAt', 'DESC']
      ],
      include: {
        model: StepModel,
        on: {
          'recipeId': { [Op.eq]: Sequelize.col('recipe.rootVersionId') }
        }
      }
    });
  }

  findOne(where) {
    return this.model.findOne({ 
      where,
      order: [
        [StepModel, 'createdAt', 'ASC'],
        [StepModel, 'updatedAt', 'DESC']
      ],
      include: 
      {
        model: StepModel
      },
    });
  }
}

module.exports = new RecipeRepository(RecipeModel);
