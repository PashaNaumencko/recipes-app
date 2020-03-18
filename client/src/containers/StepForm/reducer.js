import { addRecipeStep, editRecipeStep, deleteRecipeStep, SHOW_STEP_FORM } from '../../routines';

const initialState = {
  response: null,
  loading: false,
  error: null,
  isStepFormShown: false
};

export const addRecipeStepData = (state = initialState, action) => {
  switch (action.type) {
  case addRecipeStep.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case addRecipeStep.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case addRecipeStep.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case addRecipeStep.FULFILL:
    return {
      ...state,
      loading: false
    };
  case SHOW_STEP_FORM:
    return {
      ...state,
      isStepFormShown: true
    };
  default:
    return state;
  }
};

export const editRecipeStepData = (state = initialState, action) => {
  switch (action.type) {
  case editRecipeStep.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case editRecipeStep.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case editRecipeStep.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case editRecipeStep.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};

export const deleteRecipeStepData = (state = initialState, action) => {
  switch (action.type) {
  case deleteRecipeStep.TRIGGER:
    return {
      ...state,
      loading: true
    };
  case deleteRecipeStep.SUCCESS:
    return {
      ...state,
      response: action.payload
    };
  case deleteRecipeStep.FAILURE:
    return {
      ...state,
      error: action.payload
    };
  case deleteRecipeStep.FULFILL:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};
