'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.belongsToMany(models.Food, {
      through: 'MealFoods',
      as: 'foods',
      foreignKey: 'mealId'
    });
  };
  return Meal;
};
