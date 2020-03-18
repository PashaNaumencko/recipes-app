import { fetchAllRecipes } from '../../routines';

const initialFetchAllRecipeseState = {
  recipes: [],
  loading: false,
  error: null
};


export const allRecipesData = (state = initialFetchAllRecipeseState, action) => {
  switch (action.type) {
  case fetchAllRecipes.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case fetchAllRecipes.SUCCESS:
    return {
      ...state,
      recipes: action.payload
    };
  case fetchAllRecipes.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case fetchAllRecipes.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};
