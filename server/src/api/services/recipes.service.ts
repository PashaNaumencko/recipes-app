import recipesRepository from '../../data/repositories/recipes.repository';
import { IRecipeDoc, IRecipe, IResponse } from '../../types';
import dotenv from 'dotenv';
dotenv.config();

const serverUrl: string = process.env.SERVER_HOST;

const getAllRecipes = (): Promise<IRecipeDoc[]> => recipesRepository.getAll();

const getAllIngredients = (): Promise<string[]> => recipesRepository.getAllIngredients();

const getRecipeById = (id: string): Promise<IRecipeDoc> => recipesRepository.getById(id);

const createRecipe = async ({ imgFile, ...body }: IRecipe): Promise<IResponse> => {
  let imgUrl: string = 'https://gorving.com/_assets/_images/recipes/recipe-default@2x.png';
  if(imgFile) {
    imgFile.mv(`images/${imgFile.name}`, (err: any) => {
      if (err) {
        return {
          status: 500,
          message: 'File upload error'
        };
      }
    });
    imgUrl = `${serverUrl}/${imgFile.name}`;
  }
  const { _id } = await recipesRepository.create({ ...body, imgUrl });
  return {
    _id,
    status: 201,
    message: 'Recipe created'
  };
};

const updateRecipe = async (recipeId: string, { imgFile, ...body }: IRecipe): Promise<IResponse> => {
  if(imgFile) {
    imgFile.mv(`images/${imgFile.name}`, (err: any) => {
      if (err) {
        return {
          status: 500,
          message: 'File upload error'
        };
      }
    });
    // imgUrl = `${serverUrl}/${imgFile.name}`;
  }

  const { _id } = await recipesRepository.updateById(recipeId, body);
  return {
    _id,
    status: 200,
    message: 'Recipe title updated'
  };
};

export {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  getAllIngredients
};
