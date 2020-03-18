module.exports = (models) => {
  const { Recipe, Step, Ingredient } = models;

  Recipe.hasMany(Step);
  Step.belongsTo(Recipe);

  Recipe.hasMany(Ingredient);
  Ingredient.belongsTo(Recipe);

  // Recipe.hasMany(Recipe, {
  //   foreignKey: 'previousVersionId',
  //   as: 'previousVersions'
  // });
  // Recipe.belongsTo(Recipe, {
  //   foreignKey: 'previousVersionId',
  //   as: 'nextVersion'
  // });
};
