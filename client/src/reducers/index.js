import { combineReducers } from 'redux';
import { currentRecipeData, createRecipeData, editRecipeData, editRecipeTitleData } from '../containers/CreateRecipe/reducer';
import { addRecipeStepData, editRecipeStepData, deleteRecipeStepData } from '../components/StepForm/reducer';
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
