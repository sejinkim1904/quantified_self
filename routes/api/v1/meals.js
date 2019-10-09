const express = require('express');
const router = express.Router();
const food = require('../../../models').Food;
const meal = require('../../../models').Meal;
const mealFood = require('../../../models').MealFood;

router.get('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  await meal.findAll({
    include : [{
      model: food,
      as: 'foods',
      through: {
        attributes: []
      }
    }]
  })
    .then(async meals => {
      res.status(200).send(meals)
    })
    .catch(async error => {
      res.status(500).send({ error })
    })
})

module.exports = router;
