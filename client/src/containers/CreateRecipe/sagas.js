import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as recipeService from '../../services/recipeService';
import { fetchRecipe, createRecipe, editRecipeTitle } from '../../routines/routines';

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


function* createRecipeRequest({ payload }) {
  try {
    yield put(createRecipe.request());
    const createRecipeResponse = yield call(recipeService.addRecipe, payload);
    yield put(createRecipe.success(createRecipeResponse));
    const fetchRecipeResponse = yield call(recipeService.getRecipeByTitle, payload.title);
    yield put(fetchRecipe.success(fetchRecipeResponse));
  } catch (error) {
    yield put(createRecipe.failure(error.message));
  } finally {
    yield put(createRecipe.fulfill());
  }
}

function* watchCreateRecipeRequest() {
  yield takeEvery(createRecipe.TRIGGER, createRecipeRequest);
}

function* editRecipeTitleRequest({ payload }) {
  try {
    yield put(editRecipeTitle.request());
    const editRecipeResponse = yield call(recipeService.editRecipeTitle, payload);
    const fetchRecipeResponse = yield call(recipeService.getRecipeByTitle, payload.title);
    yield put(editRecipeTitle.success(editRecipeResponse));
    yield put(fetchRecipe.success(fetchRecipeResponse));
  } catch (error) {
    yield put(editRecipeTitle.failure(error.message));
  } finally {
    yield put(editRecipeTitle.fulfill());
  }
}

function* watchEditRecipeTitleRequest() {
  yield takeEvery(editRecipeTitle.TRIGGER, editRecipeTitleRequest);
}

export default function* createRecipePageSagas() {
  yield all([watchRecipeRequest(), watchCreateRecipeRequest(), watchEditRecipeTitleRequest()]);
}
