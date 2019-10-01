import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as recipeService from '../../services/recipeService';
import { fetchAllRecipes } from '../../routines/routines';

function* allRecipesRequest() {
  try {
    yield put(fetchAllRecipes.request());
    const response = yield call(recipeService.getAllRecipes);
    yield put(fetchAllRecipes.success(response));
  } catch (error) {
    yield put(fetchAllRecipes.failure(error.message));
  } finally {
    yield put(fetchAllRecipes.fulfill());
  }
}

function* watchAllRecipesRequest() {
  yield takeEvery(fetchAllRecipes.TRIGGER, allRecipesRequest);
}

export default function* recipeListPageSagas() {
  yield all([watchAllRecipesRequest()]);
}
  