const db = require('./connection');
module.exports = (models) => {
  const { Recipe, Step } = models;

  Recipe.hasMany(Step);
  Step.belongsTo(Recipe);

  Recipe.hasMany(Recipe, {
    foreignKey: 'previousVersionId',
    as: 'previousVersions'
  });
  Recipe.belongsTo(Recipe, {
    foreignKey: 'previousVersionId',
    as: 'nextVersion'
  });
};
