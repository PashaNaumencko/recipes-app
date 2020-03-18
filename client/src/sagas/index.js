import { all } from 'redux-saga/effects';

import createRecipeSagas from '../containers/CreateRecipe/sagas';
import stepFormSagas from '../containers/StepForm/sagas';
import recipeListSagas from '../containers/RecipeList/sagas';

export default function* rootSaga() {
  yield all([createRecipeSagas(), stepFormSagas(), recipeListSagas()]);
}
