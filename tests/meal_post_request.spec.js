const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const meal = require('../models').Meal;

describe('Meals API', () => {
  describe("POST request to '/api/v1/meals'", () => {
    beforeEach(async () => {
      await meal.destroy({where: {}});
    });
    afterEach(async () => {
      await meal.destroy({where: {}});
    });

    test('It returns created meal', async () => {
      const requestBody = {
        name: 'Parfait'
      }

      return request(app).post('/api/v1/meals').send(requestBody).then(response => {
        expect(response.status).toBe(201)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
      })
    });

    test('It returns a 400 if meal is not created', async () => {
      return request(app).post('/api/v1/meals')
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.body.message).toBe('Name is required.')
        });
    });
  });
});
