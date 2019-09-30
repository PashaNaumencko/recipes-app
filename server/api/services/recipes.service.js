const recipesRepository = require('../../data/repositories/recipes.repository');
const dotenv = require('dotenv');
dotenv.config();
const serverUrl = process.env.SERVER_HOST;

const getRecipeById = id => recipesRepository.findOne({ id });

const getRecipeByTitle = title => recipesRepository.findOne({ title });

const createRecipeTitle = async (title, imgFile) => {
  if(imgFile) {
    imgFile.mv('images/' + imgFile.name, (err) => {
      if (err) {
        return { status: 500, message: 'File upload error' };
      }
    });
  }

  await recipesRepository.create({
    title,
    imgUrl: imgFile ? `${serverUrl}/${imgFile.name}` : null
  });

  return { status: 201, message: 'Recipe title created' };
};

const updateRecipe = async (recipeId, body, imgFile) => {
  if(imgFile) {
    imgFile.mv('images/' + imgFile.name, (err) => {
      if (err) {
        return { status: 500, message: 'File upload error' };
      }
    });
  }
  
  await recipesRepository.updateById(recipeId, {
    ...body,
    imgUrl: imgFile ? `${serverUrl}/${imgFile.name}` : null
  });
  
  return { status: 200, message: 'Recipe title updated' };
};

module.exports = {
  getRecipeById,
  getRecipeByTitle,
  createRecipeTitle,
  updateRecipe
};
