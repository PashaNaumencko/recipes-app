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

export const getRecipeById = async (id) => {
  const response = await callWebApi({
    endpoint: `/api/recipes/${id}`,
    type: 'GET'
  });
  return response.json();
};

export const createRecipe = async (request) => {
  const response = await callWebApi({
    endpoint: '/api/recipes',
    type: 'POST',
    attachment: true,
    request,
    attachments: true
  });
  return response.json();
};

export const editRecipe = async (request) => {
  const { recipeId } = request;
  const response = await callWebApi({
    endpoint: `/api/recipes/${recipeId}`,
    type: 'PUT',
    request,
    attachment: true
  });
  return response.json();
};
