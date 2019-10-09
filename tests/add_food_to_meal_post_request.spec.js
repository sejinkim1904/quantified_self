const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;
const meal = require('../models').Meal;
const mealFood = require('../models').MealFood;

describe('Meals API', () => {
  describe('POST add food to meal request', () => {
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

    test('It returns a message indicating food has been added to meal', async () => {
      const apple = await food.create({
        "name": "Apple",
        "calories": 220
      });

      const parfait = await meal.create({
        name: 'Yoplait Parfait'
      })

      return request(app).post(`/api/v1/meals/${parfait.id}/foods/${apple.id}`)
        .then(response => {
          expect(response.status).toBe(201)
          console.log(response.body)
          expect(Object.keys(response.body)).toContain('message')
        })
    })
  })
})
