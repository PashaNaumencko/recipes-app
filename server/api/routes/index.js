const recipeRoutes = require('./recipes.route');


module.exports = (app) => {
  app.use('/api/recipes', recipeRoutes);
}
