module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define(
    'recipe',
    {
      title: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      ingredients: DataTypes.TEXT,
      duration: DataTypes.STRING,
      calorificValue: DataTypes.INTEGER
    },
    {
      timestamps: true
    }
  );

  return Repository;
};
