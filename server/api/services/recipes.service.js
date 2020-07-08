const recipesRepository = require('../../data/repositories/recipes.repository');
const dotenv = require('dotenv');
dotenv.config();
const serverUrl = process.env.SERVER_HOST;

const getAllRecipes = () => recipesRepository.getAll();

const getAllIngredients = () => recipesRepository.getAllIngredients();

const getRecipeById = id => recipesRepository.getById(id);

const createRecipe = async ({ imgFile, ...body }) => {
  let imgUrl = 'https://gorving.com/_assets/_images/recipes/recipe-default@2x.png';
  if(imgFile) {
    imgFile.mv('images/' + imgFile.name, (err) => {
      if (err) {
        return { status: 500, message: 'File upload error' };
      }
    });
    imgUrl = `${serverUrl}/${imgFile.name}`;
  }
  const { _id } = await recipesRepository.create({ ...body, imgUrl });
  return { _id, status: 201, message: 'Recipe created' };
};

const updateRecipe = async (recipeId, { imgFile, ...body }) => {
  let imgUrl = 'https://gorving.com/_assets/_images/recipes/recipe-default@2x.png';
  if(imgFile) {
    imgFile.mv('images/' + imgFile.name, (err) => {
      if (err) {
        return { status: 500, message: 'File upload error' };
      }
    });
    imgUrl = `${serverUrl}/${imgFile.name}`;
  }

  const { _id } = await recipesRepository.updateById(recipeId, { ...body, imgUrl });
  return { _id, status: 200, message: 'Recipe title updated' };
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  getAllIngredients
};
