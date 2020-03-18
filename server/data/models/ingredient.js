module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define(
    'ingredient',
    {
      name: DataTypes.STRING
    },
    {
      timestamps: true
    }
  );

  return Repository;
};
