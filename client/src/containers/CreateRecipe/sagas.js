import { takeEvery, put, call, all, select } from 'redux-saga/effects';
import * as recipeService from '../../services/recipeService';
import { fetchRecipe, fetchAllRecipes, createRecipe, editRecipe, editRecipeTitle } from '../../routines';
import { showStepForm } from '../StepForm/actions';

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
    const fetchRecipesResponse = yield call(recipeService.getAllRecipes);
    yield put(fetchAllRecipes.success(fetchRecipesResponse));
  } catch (error) {
    yield put(createRecipe.failure(error.message));
  } finally {
    yield put(createRecipe.fulfill());
    yield put(showStepForm());
  }
}

function* watchCreateRecipeRequest() {
  yield takeEvery(createRecipe.TRIGGER, createRecipeRequest);
}

function* editRecipeTitleRequest({ payload }) {
  try {
    yield put(editRecipeTitle.request());
    const editRecipeResponse = yield call(recipeService.editRecipeTitle, payload);
    yield put(editRecipeTitle.success(editRecipeResponse));
    const { currentRecipeData: { id: recipeId } } = yield select();
    const fetchRecipeResponse = yield call(recipeService.getRecipeById, recipeId);
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

function* editRecipeRequest({ payload }) {
  try {
    yield put(editRecipe.request());
    const editRecipeResponse = yield call(recipeService.editRecipe, payload);
    yield put(editRecipe.success(editRecipeResponse));
    const { currentRecipeData: { id: recipeId } } = yield select();
    const fetchRecipeResponse = yield call(recipeService.getRecipeById, recipeId);
    yield put(fetchRecipe.success(fetchRecipeResponse));
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
  yield all([watchRecipeRequest(), watchCreateRecipeRequest(), watchEditRecipeTitleRequest(), watchEditRecipeRequest()]);
}
