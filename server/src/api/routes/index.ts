import { Application } from 'express';
import recipeRoutes from './recipes.route';

export default (app: Application) => {
  app.use('/api/recipes', recipeRoutes);
};
