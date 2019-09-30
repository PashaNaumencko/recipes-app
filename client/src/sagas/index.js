import { all } from 'redux-saga/effects';

import createRecipeSagas from '../containers/CreateRecipe/sagas';
import stepFormSagas from '../components/StepForm/sagas';

export default function* rootSaga() {
  yield all([createRecipeSagas(), stepFormSagas()]);
}
