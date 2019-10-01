import { combineReducers } from 'redux';
import { currentRecipeData, createRecipeData, editRecipeData, editRecipeTitleData } from '../containers/CreateRecipe/reducer';
import { addRecipeStepData, editRecipeStepData, deleteRecipeStepData } from '../components/StepForm/reducer';

export default combineReducers({
  currentRecipeData,
  createRecipeData,
  editRecipeData,
  editRecipeTitleData,
  addRecipeStepData, 
  editRecipeStepData, 
  deleteRecipeStepData
});
