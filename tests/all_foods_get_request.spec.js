const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');
const food = require('../models').Food;

describe('api', () => {
  beforeEach(async () => {
    await food.destroy({where: {}});
    const avocado = await food.create({
      name: 'avocado',
      calories: 9000
    });

    const mango = await food.create({
      name: 'mango',
      calories: 6000
    });
  });

  describe('All Foods GET request', () => {
    test('It returns all foods currently in the database', () => {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toEqual(2)
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')
      })
    })
  })
})
