const Sequelize = require('sequelize');
const BaseRepository = require('./base.repository');

const { RecipeModel, StepModel, IngredientModel } = require('../models/index');

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

  getAll() {
    return this.model.findAll({
      include: {
        model: IngredientModel
      },
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
      include:
      {
        model: IngredientModel
      },
    });
  }
}

module.exports = new RecipeRepository(RecipeModel);
