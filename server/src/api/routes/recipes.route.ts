import { Router, Request, Response, NextFunction } from 'express';
import {
  getAllRecipes,
  getAllIngredients,
  getRecipeById,
  createRecipe,
  updateRecipe
} from '../services/recipes.service';
import { IRecipeDoc, IResponse } from '../../types';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  getAllRecipes()
    .then((data: IRecipeDoc[]) => res.send(data))
    .catch(next)
});

router.get('/ingredients', (req: Request, res: Response, next: NextFunction): void => {
  getAllIngredients()
    .then((data: string[]) => res.send(data))
    .catch(next)
});

router.get('/:recipeId', (req: Request, res: Response, next: NextFunction): void => {
  const { recipeId } = req.params;
  getRecipeById(recipeId)
    .then((data: IRecipeDoc) => res.send(data))
    .catch(next)
});

router.post('/', (req: Request, res: Response, next: NextFunction): void => {
  const { body, files } = req;
  const imgFile = files ? req.files.imgFile : null;
  createRecipe({ ...body, imgFile })
    .then(({ status, ...data }: IResponse) => res.status(status).send(data))
    .catch(next)
});

router.put('/:recipeId', (req: Request, res: Response, next: NextFunction): void => {
  const { recipeId } = req.params;
  updateRecipe(recipeId, req.body)
    .then(({ status, ...data }: IResponse) => res.status(status).send(data))
    .catch(next)
});

export default router;
