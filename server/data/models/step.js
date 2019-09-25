module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define(
    'step',
    {
      description: DataTypes.TEXT
    },
    {
      timestamps: true
    }
  );

  return Repository;
};
