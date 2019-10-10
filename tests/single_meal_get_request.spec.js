const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;
const meal = require('../models').Meal;
const mealFood = require('../models').MealFood;

describe('Meals API', () => {
  describe('GET single meal request', () => {
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

    test('It returns meal including associated foods', async () => {
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
      });

      await mealFood.create({
        mealId: parfait.id,
        foodId: banana.id
      });

      await mealFood.create({
        mealId: parfait.id,
        foodId: apple.id
      });

      await mealFood.create({
        mealId: parfait.id,
        foodId: yogurt.id
      });

      return request(app).get(`/api/v1/meals/${parfait.id}/foods`)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.foods.length).toEqual(3)
          expect(Object.keys(response.body)).toContain('id')
          expect(Object.keys(response.body)).toContain('name')
          expect(Object.keys(response.body)).toContain('foods')
        });
    });

    test('It returns a 404 if meal is not found', async () => {
      return request(app).get(`/api/v1/meals/90/foods`)
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.message).toBe('Meal not found.')
        });
    });
  });
});
