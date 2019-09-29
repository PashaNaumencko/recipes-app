import { all } from 'redux-saga/effects';

import createRecipeSagas from '../containers/CreateRecipe/sagas';

export default function* rootSaga() {
  yield all([createRecipeSagas()]);
}
