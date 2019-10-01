import { fetchRecipe, createRecipe, editRecipe, editRecipeTitle } from '../../routines/routines';

const initialFetchRecipeState = {
  id: '',
  title: '',
  imgUrl: '',
  ingredients: '',
  calorificValue: 0,
  duration: '',
  createdAt: '',
  updatedAt: '',
  previousVersionId: '',
  previousVersion: null,
  previousVersions: [],
  steps: null,
  loading: false,
  error: null
};


const initialCreateRecipeState = {
  response: null,
  loading: false,
  error: null
};

export const createRecipeData = (state = initialCreateRecipeState, action) => {
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

export const editRecipeTitleData = (state = initialCreateRecipeState, action) => {
  switch (action.type) {
  case editRecipeTitle.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case editRecipeTitle.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case editRecipeTitle.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case editRecipeTitle.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};


export const editRecipeData = (state = initialCreateRecipeState, action) => {
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

export const currentRecipeData = (state = initialFetchRecipeState, action) => {
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
