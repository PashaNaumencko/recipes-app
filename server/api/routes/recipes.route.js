const { Router } = require('express');
const {
  getAllRecipes,
  getAllIngredients,
  getRecipeById,
  createRecipe,
  updateRecipe
} = require('../services/recipes.service');

const router = Router();

router.get('/', (req, res, next) => {
  getAllRecipes()
    .then(data => res.send(data))
    .catch(next)
});

router.get('/ingredients', (req, res, next) => {
  getAllIngredients()
    .then(data => res.send(data))
    .catch(next)
});

router.get('/:recipeId', (req, res, next) => {
  const { recipeId } = req.params;
  getRecipeById(recipeId)
    .then(data => res.send(data))
    .catch(next)
});

router.post('/', (req, res, next) => {
  const { body, files } = req;
  const imgFile = files ? req.files.imgFile : null;
  createRecipe({ ...body, imgFile })
    .then(({ status, ...data }) => res.status(status).send(data))
    .catch(next)
});

router.put('/:recipeId', (req, res, next) => {
  const { recipeId } = req.params;
  updateRecipe(recipeId, req.body)
    .then(({ status, ...data }) => res.status(status).send(data))
    .catch(next)
});

module.exports = router;
