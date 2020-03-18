import { combineReducers } from 'redux';
import { currentRecipeData, createRecipeData, editRecipeData, editRecipeTitleData } from '../containers/CreateRecipe/reducer';
import { addRecipeStepData, editRecipeStepData, deleteRecipeStepData } from '../containers/StepForm/reducer';
import { allRecipesData } from '../containers/RecipeList/reducer';

export default combineReducers({
  currentRecipeData,
  createRecipeData,
  editRecipeData,
  editRecipeTitleData,
  addRecipeStepData,
  editRecipeStepData,
  deleteRecipeStepData,
  allRecipesData
});
