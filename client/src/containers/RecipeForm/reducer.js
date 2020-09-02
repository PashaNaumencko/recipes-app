import { createRecipe, editRecipe } from '../../routines';

const initialRecipeResponseState = {
  response: null,
  loading: false,
  error: null
};

export const createRecipeData = (state = initialRecipeResponseState, action) => {
  switch (action.type) {
  case createRecipe.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case createRecipe.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case createRecipe.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case createRecipe.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};


export const editRecipeData = (state = initialRecipeResponseState, action) => {
  switch (action.type) {
  case editRecipe.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case editRecipe.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case editRecipe.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case editRecipe.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};

