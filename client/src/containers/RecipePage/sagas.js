import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as recipeService from '../../services/recipeService';
import { fetchRecipe } from '../../routines';

function* recipeRequest({ payload: recipeId }) {
  try {
    yield put(fetchRecipe.request());
    const response = yield call(recipeService.getRecipeById, recipeId);
    yield put(fetchRecipe.success(response));
  } catch (error) {
    yield put(fetchRecipe.failure(error.message));
  } finally {
    yield put(fetchRecipe.fulfill());
  }
}

function* watchRecipeRequest() {
  yield takeEvery(fetchRecipe.TRIGGER, recipeRequest);
}

export default function* RecipePageSagas() {
  yield all([watchRecipeRequest()]);
}
