const { Router } = require('express');
const {
  getAllRecipeSteps,
  addRecipeStep,
  editRecipeStep,
  deleteRecipeStep
} = require('../services/steps.service');

const router = Router();

router.get('/:recipeId', (req, res, next) => {
  const { recipeId } = req.params;
  getAllRecipeSteps(recipeId)
    .then(data => res.send(data))
    .catch(next)
});

router.post('/', (req, res, next) => {
  addRecipeStep(req.body)
    .then(data => res.status(data.status).send({ message: data.message }))
    .catch(next)
});

router.put('/:stepId', (req, res, next) => {
  const { stepId } = req.params;
  editRecipeStep(stepId, req.body)
    .then(data => res.status(data.status).send({ message: data.message }))
    .catch(next)
});

router.delete('/:stepId', (req, res, next) => {
  const { stepId } = req.params;
  deleteRecipeStep(stepId)
    .then(data => res.send({ data }))
    .catch(next)
});

module.exports = router;
