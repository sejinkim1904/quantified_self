'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id'
      }
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Foods',
        key: 'id'
      }
    }
  }, {});
  MealFood.associate = function(models) {
    // associations can be defined here
  };
  return MealFood;
};
