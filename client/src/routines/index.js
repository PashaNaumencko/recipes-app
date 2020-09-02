import { createRoutine } from 'redux-saga-routines';

export const fetchRecipe = createRoutine('FETCH_RECIPE');
export const fetchRecipes = createRoutine('FETCH_RECIPES');
export const createRecipe = createRoutine('CREATE_RECIPE');
export const editRecipe = createRoutine('EDIT_RECIPE');
