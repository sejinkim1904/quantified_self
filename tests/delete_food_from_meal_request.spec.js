const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;
const meal = require('../models').Meal;
const mealFood = require('../models').MealFood;

describe('Meals API', () => {
  describe('DELETE food from meal request', () => {
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

    test('It returns a status code of 204', async () => {
      const apple = await food.create({
        "name": "Apple",
        "calories": 220
      });

      const parfait = await meal.create({
        name: 'Yoplait Parfait'
      });

      await mealFood.create({
        foodId: apple.id,
        mealId: parfait.id
      });

      return request(app).delete(`/api/v1/meals/${parfait.id}/foods/${apple.id}`)
        .then(response => {
          expect(response.status).toBe(204)
        });
    });

    test('It returns a 404 if food is not found', async () => {
      const parfait = await meal.create({
        name: 'Yoplait Parfait'
      });

      return request(app).delete(`/api/v1/meals/${parfait.id}/foods/90`)
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.message).toBe('Food not found.')
        });
    });

    test('It returns a 404 if meal is not found', async () => {
      const apple = await food.create({
        "name": "Apple",
        "calories": 220
      });

      return request(app).delete(`/api/v1/meals/90/foods/${apple.id}`)
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.message).toBe('Meal not found.')
        });
    });
  });
});
