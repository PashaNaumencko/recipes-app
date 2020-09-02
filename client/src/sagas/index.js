import { all } from 'redux-saga/effects';

import RecipeFormSagas from '../containers/RecipeForm/sagas';
import RecipePageSagas from '../containers/RecipePage/sagas';
import recipeListSagas from '../containers/RecipeList/sagas';

export default function* rootSaga() {
  yield all([RecipeFormSagas(), recipeListSagas(), RecipePageSagas()]);
}
