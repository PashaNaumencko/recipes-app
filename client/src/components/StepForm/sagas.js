import { takeEvery, put, call, all, select } from 'redux-saga/effects';
import * as recipeService from '../../services/recipeService';
import * as stepService from '../../services/stepService';
import { fetchRecipe, addRecipeStep, editRecipeStep, deleteRecipeStep } from '../../routines/routines';

function* addRecipeStepRequest({ payload }) {
  try {
    yield put(addRecipeStep.request());
    const createRecipeResponse = yield call(stepService.addRecipeStep, payload);
    yield put(addRecipeStep.success(createRecipeResponse));
    const { currentRecipeData: { id: recipeId } } = yield select();
    const fetchRecipeResponse = yield call(recipeService.getRecipeById, recipeId);
    yield put(fetchRecipe.success(fetchRecipeResponse));
  } catch (error) {
    yield put(addRecipeStep.failure(error.message));
  } finally {
    yield put(addRecipeStep.fulfill());
  }
}
  
function* watchCreateRecipeRequest() {
  yield takeEvery(addRecipeStep.TRIGGER, addRecipeStepRequest);
}
  
function* editRecipeStepRequest({ payload }) {
  try {
    yield put(editRecipeStep.request());
    const editRecipeResponse = yield call(stepService.editRecipeStep, payload);
    yield put(editRecipeStep.success(editRecipeResponse));
    const { currentRecipeData: { id: recipeId } } = yield select();
    const fetchRecipeResponse = yield call(recipeService.getRecipeById, recipeId);
    yield put(fetchRecipe.success(fetchRecipeResponse));
  } catch (error) {
    yield put(editRecipeStep.failure(error.message));
  } finally {
    yield put(editRecipeStep.fulfill());
  }
}
  
function* watchEditRecipeStepRequest() {
  yield takeEvery(editRecipeStep.TRIGGER, editRecipeStepRequest);
}

  
function* deleteRecipeStepRequest({ payload: stepId }) {
  try {
    yield put(deleteRecipeStep.request());
    const deleteRecipeStepResponse = yield call(stepService.deleteRecipeStep, stepId);
    yield put(deleteRecipeStep.success(deleteRecipeStepResponse));
    const { currentRecipeData: { id: recipeId } } = yield select();
    const fetchRecipeResponse = yield call(recipeService.getRecipeById, recipeId);
    yield put(fetchRecipe.success(fetchRecipeResponse));
  } catch (error) {
    yield put(deleteRecipeStep.failure(error.message));
  } finally {
    yield put(deleteRecipeStep.fulfill());
  }
}
  
function* watchDeleteRecipeStepRequest() {
  yield takeEvery(deleteRecipeStep.TRIGGER, deleteRecipeStepRequest);
}
  
export default function* createRecipePageSagas() {
  yield all([watchCreateRecipeRequest(), watchEditRecipeStepRequest(), watchDeleteRecipeStepRequest()]);
}
