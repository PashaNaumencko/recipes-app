const { Router } = require('express');
const { 
  getRecipeById, 
  getRecipeByTitle, 
  createRecipeTitle, 
  updateRecipeTitle, 
  updateRecipe, 
  saveRecipeVersion 
} = require('../services/recipes.service');

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

router.put('/title/:recipeId', (req, res, next) => {
  const { imgFile } = req.files;
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
