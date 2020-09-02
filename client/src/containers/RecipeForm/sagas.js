import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as recipeService from '../../services/recipeService';
import { fetchRecipes, createRecipe, editRecipe } from '../../routines';

function* createRecipeRequest({ payload }) {
  try {
    yield put(createRecipe.request());
    const createRecipeResponse = yield call(recipeService.createRecipe, payload);
    yield put(createRecipe.success(createRecipeResponse));
    const fetchRecipesResponse = yield call(recipeService.getAllRecipes);
    yield put(fetchRecipes.success(fetchRecipesResponse));
  } catch (error) {
    yield put(createRecipe.failure(error.message));
  } finally {
    yield put(createRecipe.fulfill());
  }
}

function* watchCreateRecipeRequest() {
  yield takeEvery(createRecipe.TRIGGER, createRecipeRequest);
}

function* editRecipeRequest({ payload }) {
  try {
    yield put(editRecipe.request());
    const editRecipeResponse = yield call(recipeService.editRecipe, payload);
    yield put(editRecipe.success(editRecipeResponse));
    const fetchRecipesResponse = yield call(recipeService.getAllRecipes);
    yield put(fetchRecipes.success(fetchRecipesResponse));
  } catch (error) {
    yield put(editRecipe.failure(error.message));
  } finally {
    yield put(editRecipe.fulfill());
  }
}

function* watchEditRecipeRequest() {
  yield takeEvery(editRecipe.TRIGGER, editRecipeRequest);
}

export default function* createRecipePageSagas() {
  yield all([watchCreateRecipeRequest(), watchEditRecipeRequest()]);
}
