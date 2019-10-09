const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;

describe('Foods API', () => {
  describe("POST request to '/api/v1/foods'", () => {
    beforeEach(async () => {
      await food.destroy({where: {}});
    });
    afterEach(async () => {
      await food.destroy({where: {}});
    });

    test('it returns created food item', () => {
      const requestBody = {
        name: 'Cheese',
        calories: 90
      }

      return request(app).post('/api/v1/foods').send(requestBody).then(response => {
        expect(response.status).toBe(201)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('calories')
      })
    })
  })
})
