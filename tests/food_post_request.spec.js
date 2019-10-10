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

    test('It returns created food item', () => {
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

    test('It returns a 400 if food name is not included', () => {
      const requestBody = {
        calories: 90
      }

      return request(app).post('/api/v1/foods').send(requestBody).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Name is a required field.')
      })
    })

    test('It returns a 400 if food calories is not included', () => {
      const requestBody = {
        name: 'Cheese'
      }

      return request(app).post('/api/v1/foods').send(requestBody).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Calories is a required field.')
      })
    })
  })
})
