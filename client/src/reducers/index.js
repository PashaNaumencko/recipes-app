import { combineReducers } from 'redux';
import { currentRecipeData, createRecipeData, editRecipeData } from '../containers/CreateRecipe/reducer';
import { addRecipeStepData, editRecipeStepData, deleteRecipeStepData } from '../components/StepForm/reducer';

export default combineReducers({
  currentRecipeData,
  createRecipeData,
  editRecipeData,
  addRecipeStepData, 
  editRecipeStepData, 
  deleteRecipeStepData
});
