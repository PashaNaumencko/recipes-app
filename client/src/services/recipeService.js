import callWebApi from '../helpers/callWebApi';

export const getAllRecipes = async () => {
  const response = await callWebApi({
    endpoint: '/api/recipes',
    type: 'GET'
  });
  return response.json();
};

export const getAllIngredients = async () => {
  const response = await callWebApi({
    endpoint: '/api/recipes/ingredients',
    type: 'GET'
  });
  return response.json();
};

export const getAllVersions = async (id) => {
  const response = await callWebApi({
    endpoint: `/api/recipes/versions/${id}`,
    type: 'GET'
  });
  return response.json();
};

export const getRecipeById = async id => {
  const response = await callWebApi({
    endpoint: `/api/recipes/${id}`,
    type: 'GET'
  });
  return response.json();
};

export const getRecipeByTitle = async title => {
  const response = await callWebApi({
    endpoint: `/api/recipes/title/${title}`,
    type: 'GET'
  });
  return response.json();
};

export const addRecipe = async (request) => {
  const response = await callWebApi({
    endpoint: '/api/recipes',
    type: 'POST',
    attachment: true,
    request
  });
  return response.json();
};

export const editRecipeTitle = async (request) => {
  const { recipeId } = request;
  const response = await callWebApi({
    endpoint: `/api/recipes/title/${recipeId}`,
    type: 'PUT',
    attachment: true,
    request
  });
  return response.json();
};

export const editRecipe = async (request) => {
  const { recipeId } = request;
  const response = await callWebApi({
    endpoint: `/api/recipes/${recipeId}`,
    type: 'PUT',
    request
  });
  return response.json();
};

export const saveRecipeVersion = async (request) => {
  const response = await callWebApi({
    endpoint: '/api/recipes/save',
    type: 'POST',
    request
  });
  return response.json();
};
