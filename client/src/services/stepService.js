import callWebApi from '../helpers/callWebApi';

export const addRecipeStep = async (request) => {
  const response = await callWebApi({
    endpoint: '/api/steps',
    type: 'POST',
    request
  });
  return response.json();
};

export const editRecipeStep = async (request) => {
  const { stepId } = request;
  const response = await callWebApi({
    endpoint: `/api/steps/${stepId}`,
    type: 'PUT',
    request
  });
  return response.json();
};

export const deleteRecipeStep = async (stepId) => {
  const response = await callWebApi({
    endpoint: `/api/steps/${stepId}`,
    type: 'DELETE'
  });
  return response.json();
};
