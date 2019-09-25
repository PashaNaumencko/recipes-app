module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define(
    'recipe',
    {
      title: DataTypes.STRING,
      ingredients: DataTypes.TEXT
    },
    {
      timestamps: true
    }
  );

  return Repository;
};
