const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;

describe('api', () => {
  describe('Update Food request', () => {
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

      const reqBody = {
        name: 'shishito',
        calories: 15
      }
      return request(app).patch(`/api/v1/foods/${avocado.id}`)
        .send(reqBody)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.name).toEqual('shishito')
          expect(response.body.calories).toEqual(15)
        })
    })
  })
})
