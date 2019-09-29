import { combineReducers } from 'redux';
import { currentRecipeData, createRecipeData, editRecipeTitleData } from '../containers/CreateRecipe/reducer';

export default combineReducers({
  currentRecipeData,
  createRecipeData,
  editRecipeTitleData
});
