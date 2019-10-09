const express = require('express');
const router = express.Router();
const food = require('../../../models').Food;
const meal = require('../../../models').Meal;
const mealFood = require('../../../models').MealFood;

/* GET all meals */
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

/* GET one meal */
router.get('/:meal_id/foods', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  await meal.findOne({
    where: { id: req.params.meal_id },
    include : [{
      model: food,
      as: 'foods',
      through: {
        attributes: []
      }
    }]
  })
    .then(async meal => {
      res.status(200).send(meal)
    })
    .catch(async error => {
      res.status(500).send({ error })
    })
})

/* POST add food to meal */
router.post('/:meal_id/foods/:id', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  await mealFood.create({
    mealId: req.params.meal_id,
    foodId: req.params.id,
  })
    .then(async mealFood => {
      const getFood = await food.findOne({where: mealFood.foodId})
      const getMeal = await meal.findOne({where: mealFood.mealId})
      
      res.status(201).send({
        "message": `Successfully added ${getFood.name} to ${getMeal.name}`
      })
    })
    .catch(async error => {
      res.status(500).send({ error })
    })
})

module.exports = router;
