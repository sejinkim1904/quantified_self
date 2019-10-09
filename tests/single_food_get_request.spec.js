const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;

describe('api', () => {
  describe('Single Food GET request', () => {
    beforeEach(async () => {
      await food.destroy({where: {}});
    });
    afterEach(async () => {
      await food.destroy({where: {}});
    });

    test('It returns the food object with the specific :id', async () => {
      const avocado = await food.create({
        name: 'avocado',
        calories: 9000
      });
      
      return request(app).get(`/api/v1/foods/${avocado.id}`).then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('calories')
      })
    })
  })
})
