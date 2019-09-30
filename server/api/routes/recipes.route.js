const { Router } = require('express');
const { getRecipeById, getRecipeByTitle, createRecipeTitle, updateRecipe } = require('../services/recipes.service');

const router = Router();

router.get('/:recipeId', (req, res, next) => {
  const { recipeId } = req.params;
  getRecipeById(recipeId)
    .then(data => res.send(data))
    .catch(next)
});

router.get('/title/:title', (req, res, next) => {
  const { title } = req.params;
  getRecipeByTitle(title)
    .then(data => res.send(data))
    .catch(next)
});

router.post('/', (req, res, next) => {
  const imgFile = req.files.imgFile;
  const { title } = req.body;
  createRecipeTitle(title, imgFile)
    .then(data => {
      console.log(data);
      res.status(data.status).send({ message: data.message });
    })
    .catch(next)
});

router.put('/:recipeId', (req, res, next) => {
  const imgFile = req.files ? req.files.imgFile : null;
  const { recipeId } = req.params;
  console.log(req.body);
  updateRecipe(recipeId, req.body, imgFile)
    .then(data => res.status(data.status).send({ message: data.message }))
    .catch(next)
});

module.exports = router;
