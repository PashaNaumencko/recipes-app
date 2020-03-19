const recipesRepository = require('../../data/repositories/recipes.repository');
const ingredientsRepository = require('../../data/repositories/ingredients.repository');
const dotenv = require('dotenv');
dotenv.config();
const serverUrl = process.env.SERVER_HOST;

const getAllRecipes = () => recipesRepository.getAll();

const getAllIngredients = () => ingredientsRepository.getAll();

const getAllVersions = id => recipesRepository.getAllVersions(id);

const getRecipeById = id => recipesRepository.findOne({ id });

const getRecipeByTitle = title => recipesRepository.findOne({ title });

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
  const { id } = await recipesRepository.create({ ...body, imgUrl });
  const ingredients = body.ingredients
    .split(',')
    .map(ing => ({ name: ing, recipeId: id }));

  await ingredientsRepository.bulkCreate(ingredients);
  return { id, status: 201, message: 'Recipe created' };
};

const updateRecipeTitle = async (recipeId, { title, imgFile }) => {
  let imgUrl = 'https://gorving.com/_assets/_images/recipes/recipe-default@2x.png';
  if(imgFile) {
    imgFile.mv('images/' + imgFile.name, (err) => {
      if (err) {
        return { status: 500, message: 'File upload error' };
      }
    });
    imgUrl = `${serverUrl}/${imgFile.name}`;
  }

  await recipesRepository.updateById(recipeId, {
    title,
    imgUrl
  });

  return { status: 200, message: 'Recipe title updated' };
};

const updateRecipe = async (recipeId, body) => {
  await recipesRepository.updateById(recipeId, body);

  return { status: 200, message: 'Recipe title updated' };
}

const saveRecipeVersion = async (body) => {
  await recipesRepository.create(body);

  return { status: 201, message: 'Recipe version saved' };
}

module.exports = {
  getAllRecipes,
  getAllVersions,
  getRecipeById,
  getRecipeByTitle,
  createRecipe,
  updateRecipeTitle,
  updateRecipe,
  saveRecipeVersion,
  getAllIngredients
};
