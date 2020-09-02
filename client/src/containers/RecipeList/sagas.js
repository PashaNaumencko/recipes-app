import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as recipeService from '../../services/recipeService';
import { fetchRecipes } from '../../routines';

function* fetchRecipesRequest() {
  try {
    yield put(fetchRecipes.request());
    const response = yield call(recipeService.getAllRecipes);
    yield put(fetchRecipes.success(response));
  } catch (error) {
    yield put(fetchRecipes.failure(error.message));
  } finally {
    yield put(fetchRecipes.fulfill());
  }
}

function* watchFetchRecipesRequest() {
  yield takeEvery(fetchRecipes.TRIGGER, fetchRecipesRequest);
}

export default function* recipeListPageSagas() {
  yield all([watchFetchRecipesRequest()]);
}
