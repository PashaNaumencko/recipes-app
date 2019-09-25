module.exports = (models) => {
    const { Recipe, Step } = models;

    Recipe.hasMany(Step);
    Step.belongsTo(Recipe);

    Recipe.hasOne(Recipe, {
        foreignKey: 'previousVersionId',
        as: 'previousVersion'
      });
    Recipe.belongsTo(Recipe, {
        foreignKey: 'previousVersionId',
        as: 'nextVersion'
    });
};
