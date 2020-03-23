const { Router } = require('express');
const {
  getAllRecipes,
  getAllIngredients,
  getAllVersions,
  getRecipeById,
  createRecipe,
  updateRecipeTitle,
  updateRecipe,
  saveRecipeVersion
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

router.get('/versions/:recipeId', (req, res, next) => {
  const { recipeId } = req.params;
  getAllVersions(recipeId)
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
    .then(data => res.status(data.status).send({ message: data.message }))
    .catch(next)
});

router.put('/title/:recipeId', (req, res, next) => {
  const imgFile = req.files ? req.files.imgFile : null;
  const { recipeId } = req.params;
  const { title } = req.body;
  updateRecipeTitle(recipeId, { title, imgFile })
    .then(data => res.status(data.status).send({ message: data.message }))
    .catch(next)
});

router.put('/:recipeId', (req, res, next) => {
  const { recipeId } = req.params;
  updateRecipe(recipeId, req.body)
    .then(data => res.status(data.status).send({ message: data.message }))
    .catch(next)
});

router.post('/save', (req, res, next) => {
  saveRecipeVersion(req.body)
    .then(data => res.status(data.status).send({ message: data.message }))
    .catch(next)
});

module.exports = router;
