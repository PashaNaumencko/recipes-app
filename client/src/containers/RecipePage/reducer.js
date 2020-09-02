import { fetchRecipe } from '../../routines';

const initialFetchRecipeState = {
  _id: '',
  title: '',
  imgUrl: '',
  calorificValue: 0,
  duration: '',
  ingredients: [],
  steps: [],
  loading: false,
  error: null
};

export const fetchRecipeData = (state = initialFetchRecipeState, action) => {
  switch (action.type) {
  case fetchRecipe.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case fetchRecipe.SUCCESS:
    return {
      ...state,
      ...action.payload
    };
  case fetchRecipe.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case fetchRecipe.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};
