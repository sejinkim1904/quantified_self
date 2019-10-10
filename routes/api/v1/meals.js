const express = require('express');
const router = express.Router();
const food = require('../../../models').Food;
const meal = require('../../../models').Meal;
const mealFood = require('../../../models').MealFood;

/* POST meal */
router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  if (!req.body.name) {
    payload = {
      message: 'Name is required.'
    }
    res.status(400).send(payload)
    return;
  }
  
  await meal.create({
    name: req.body.name,
  })
    .then(async meal => {
      res.status(201).send(meal)
    })
    .catch(async error => {
      res.status(500).send({ error })
    })
});

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
      if (!meal) {
        payload = {
          message: 'Meal not found.'
        }
        res.status(404).send(payload)
        return;
      }
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

      if (!getFood) {
        payload = {
          message: 'Food not found.'
        }
        res.status(404).send(payload)
        return;
      }

      if (!getMeal) {
        payload = {
          message: 'Meal not found.'
        }
        res.status(404).send(payload)
        return;
      }

      res.status(201).send({
        "message": `Successfully added ${getFood.name} to ${getMeal.name}`
      });
    })
    .catch(async error => {
      res.status(500).send({ error })
    });
});

/* DELETE food from meal */
router.delete('/:meal_id/foods/:id', async (req, res, next) => {
  res.setHeader('Content-type', 'application/json')

  const getFood = await food.findOne({where: {id: req.params.id}})
  const getMeal = await meal.findOne({where: {id: req.params.meal_id}})

  if (!getFood) {
    payload = {
      message: 'Food not found.'
    }
    res.status(404).send(payload)
    return;
  }

  if (!getMeal) {
    payload = {
      message: 'Meal not found.'
    }
    res.status(404).send(payload)
    return;
  }

  await mealFood.destroy({
    where: {
      mealId: req.params.meal_id,
      foodId: req.params.id,
    }
  })
    .then(async destroyedMealFood => {
      res.status(204).send()
    })
    .catch(async error => {
      res.status(500).send({ error })
    });
});

module.exports = router;
