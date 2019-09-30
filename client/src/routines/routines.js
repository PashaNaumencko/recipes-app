import { createRoutine } from 'redux-saga-routines';

export const fetchRecipe = createRoutine('FETCH_RECIPE');
export const createRecipe = createRoutine('CREATE_RECIPE');
export const editRecipe = createRoutine('EDIT_RECIPE');
export const fetchRecipeSteps = createRoutine('FETCH_RECIPE_STEPS');
export const addRecipeStep = createRoutine('ADD_RECIPE_STEP');
export const editRecipeStep = createRoutine('EDIT_RECIPE_STEP');
export const deleteRecipeStep = createRoutine('DELETE_RECIPE_STEP');
export const saveRecipeAddInfo = createRoutine('SAVE_RECIPE_ADD_INFO');
