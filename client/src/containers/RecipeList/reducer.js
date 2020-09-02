import { fetchRecipes } from '../../routines';

const initialFetchRecipesState = {
  recipes: [],
  loading: false,
  error: null
};


export const fetchRecipesData = (state = initialFetchRecipesState, action) => {
  switch (action.type) {
  case fetchRecipes.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case fetchRecipes.SUCCESS:
    return {
      ...state,
      recipes: action.payload
    };
  case fetchRecipes.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case fetchRecipes.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};
