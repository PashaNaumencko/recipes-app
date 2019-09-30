const recipeRoutes = require('./recipes.route');
const stepsRoutes = require('./steps.route');


module.exports = (app) => {
  app.use('/api/recipes', recipeRoutes);
  app.use('/api/steps', stepsRoutes);
}
