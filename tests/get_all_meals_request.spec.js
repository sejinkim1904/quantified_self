const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;
const meal = require('../models').Meal;
const mealFood = require('../models').MealFood;

describe('Meals API', () => {
  describe('GET all meals request', () => {
    beforeEach(async () => {
      await mealFood.destroy({where: {}});
      await meal.destroy({where: {}});
      await food.destroy({where: {}});
    });
    afterEach(async () => {
      await mealFood.destroy({where: {}});
      await meal.destroy({where: {}});
      await food.destroy({where: {}});
    });

    test('It returns all meals including associated foods', async () => {
      const avocado = await food.create({
        name: 'avocado',
        calories: 9000
      });

      const banana = await food.create({
        "name": "Banana",
        "calories": 150
      });

      const yogurt = await food.create({
        "name": "Yogurt",
        "calories": 550
      });

      const apple = await food.create({
        "name": "Apple",
        "calories": 220
      });

      const parfait = await meal.create({
        name: 'Yoplait Parfait'
      })

      const fruitSalad = await meal.create({
        name: 'Fruit Salad'
      })

      await mealFood.create({
        mealId: parfait.id,
        foodId: banana.id
      })

      await mealFood.create({
        mealId: parfait.id,
        foodId: apple.id
      })

      await mealFood.create({
        mealId: parfait.id,
        foodId: yogurt.id
      })

      await mealFood.create({
        mealId: fruitSalad.id,
        foodId: apple.id
      })

      await mealFood.create({
        mealId: fruitSalad.id,
        foodId: banana.id
      })

      await mealFood.create({
        mealId: fruitSalad.id,
        foodId: avocado.id
      })

      return request(app).get(`/api/v1/meals`)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.length).toEqual(2)
          expect(Object.keys(response.body[0])).toContain('id')
          expect(Object.keys(response.body[0])).toContain('name')
          expect(Object.keys(response.body[0])).toContain('foods')
        })
    })
  })
})
