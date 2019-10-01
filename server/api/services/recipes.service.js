const recipesRepository = require('../../data/repositories/recipes.repository');
const dotenv = require('dotenv');
dotenv.config();
const serverUrl = process.env.SERVER_HOST;

const getRecipeById = id => recipesRepository.findOne({ id });

const getRecipeByTitle = title => recipesRepository.findOne({ title });

const createRecipeTitle = async (title, imgFile) => {
  imgFile.mv('images/' + imgFile.name, (err) => {
    if (err) {
      return { status: 500, message: 'File upload error' };
    }
  });

  await recipesRepository.create({
    title,
    imgUrl: `${serverUrl}/${imgFile.name}`
  });

  return { status: 201, message: 'Recipe title created' };
};

const updateRecipeTitle = async (recipeId, { title, imgFile }) => {
  imgFile.mv('images/' + imgFile.name, (err) => {
    if (err) {
      return { status: 500, message: 'File upload error' };
    }
  });
  
  await recipesRepository.updateById(recipeId, {
    title,
    imgUrl: `${serverUrl}/${imgFile.name}`
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
  getRecipeById,
  getRecipeByTitle,
  createRecipeTitle,
  updateRecipeTitle,
  updateRecipe,
  saveRecipeVersion
};
