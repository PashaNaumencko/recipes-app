import { createRoutine } from 'redux-saga-routines';

export const fetchRecipe = createRoutine('FETCH_RECIPE');
export const createRecipe = createRoutine('CREATE_RECIPE');
export const editRecipeTitle = createRoutine('EDIT_RECIPE_TITLE');
export const saveRecipeSteps = createRoutine('SAVE_RECIPE_STEP');
export const saveRecipeAddInfo = createRoutine('SAVE_RECIPE_ADD_INFO');
