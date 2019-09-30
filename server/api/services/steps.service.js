const stepsRepository = require('../../data/repositories/steps.repository');

const getAllRecipeSteps = recipeId => stepsRepository.getByRecipeId(recipeId);

const addRecipeStep = async (step) => {
  await stepsRepository.create(step);
  return {
    status: 201,
    message: 'Recipe step created'
  };
};

const editRecipeStep = async (stepId, step) => {
  await stepsRepository.updateById(stepId, step);
  return {
    status: 200,
    message: 'Recipe step edited'
  };
} 

const deleteRecipeStep = stepId => stepsRepository.deleteById(stepId);

module.exports = {
  getAllRecipeSteps,
  addRecipeStep,
  editRecipeStep,
  deleteRecipeStep
};
