import { combineReducers } from 'redux';
import { createRecipeData, editRecipeData } from '../containers/RecipeForm/reducer';
import { fetchRecipeData } from '../containers/RecipePage/reducer';
import { fetchRecipesData } from '../containers/RecipeList/reducer';

export default combineReducers({
  fetchRecipeData,
  createRecipeData,
  editRecipeData,
  fetchRecipesData
});
