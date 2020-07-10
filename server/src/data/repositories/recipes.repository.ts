import BaseRepository from './base.repository';
import { Recipe } from '../models';
import { IRecipeDoc } from '../../types';

class RecipeRepository extends BaseRepository<IRecipeDoc> {
  getAllIngredients(): Promise<string[]> {
    return this.model.find()
      .select({ _id: 1, ingredients: 1 })
      .distinct('ingredients')
      .exec();
  }
}

export default new RecipeRepository(Recipe);
