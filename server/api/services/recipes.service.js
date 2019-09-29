const recipesRepository = require('../../data/repositories/recipes.repository');
const dotenv = require('dotenv');
dotenv.config();
const serverUrl = process.env.SERVER_HOST;

const getRecipeById = id => recipesRepository.getById(id);

const getRecipeByTitle = title => recipesRepository.getByTitle(title);

const createRecipeTitle = async (title, imgFile) => {
  imgFile.mv('images/' + imgFile.name, (err) => {
    if (err) {
      return { status: 500, message: 'File upload error' };
    }
  });

  recipesRepository.create({
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
  
  recipesRepository.updateById(recipeId, {
    title,
    imgUrl: `${serverUrl}/${imgFile.name}`
  });
  
  return { status: 200, message: 'Recipe title updated' };
};

module.exports = {
  getRecipeById,
  getRecipeByTitle,
  createRecipeTitle,
  updateRecipeTitle
};
