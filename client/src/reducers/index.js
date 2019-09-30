import { combineReducers } from 'redux';
import { currentRecipeData, createRecipeData, editRecipeTitleData } from '../containers/CreateRecipe/reducer';
import { addRecipeStepData, editRecipeStepData, deleteRecipeStepData } from '../components/StepForm/reducer';

export default combineReducers({
  currentRecipeData,
  createRecipeData,
  editRecipeTitleData,
  addRecipeStepData, 
  editRecipeStepData, 
  deleteRecipeStepData
});
