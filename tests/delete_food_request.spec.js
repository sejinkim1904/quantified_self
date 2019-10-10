const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;

describe('api', () => {
  describe('Delete Food request', () => {
    beforeEach(async () => {
      await food.destroy({where: {}});
    });
    afterEach(async () => {
      await food.destroy({where: {}});
    });

    test('It returns status code of 204', async () => {
      const avocado = await food.create({
        name: 'avocado',
        calories: 9000
      });

      return request(app).delete(`/api/v1/foods/${avocado.id}`)
        .then(response => {
          expect(response.status).toBe(204)
        });
    });

    test('It returns status code of 404', async () => {
      return request(app).delete('/api/v1/foods/9000')
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.message).toBe('Food is not found.')
        });
    });
  });
});
