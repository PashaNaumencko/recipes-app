  
const Sequelize = require('sequelize');
const BaseRepository = require('./base.repository');

const { RecipeModel, StepModel } = require('../models/index');

const { Op } = Sequelize;

class RecipeRepository extends BaseRepository {
  findOne(where) {
    return this.model.findOne({ 
      where,
      order: [
        [StepModel, 'createdAt', 'ASC'],
        [StepModel, 'updatedAt', 'DESC']
      ],
      include: [
        {
          model: StepModel,
        }, 
        {
          model: this.model,
          as: 'previousVersions',
          include: {
            model: StepModel,
            on: {
              'recipeId': { [Op.eq]: Sequelize.col('previousVersions.previousVersionId') }
            }
          }
        }
      ]
    });
  }
}

module.exports = new RecipeRepository(RecipeModel);
