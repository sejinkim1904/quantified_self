const express = require('express');
const router = express.Router();
const food = require('../../../models').Food;

/* GET all foods*/
router.get('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  await food.findAll()
    .then(async foods => {
      res.status(200).send(foods)
    })
    .catch(error => {
      res.status(500).send({ error })
    })
})

/* GET single food */
router.get('/:id', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  await food.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(foundFood => {
      if (!foundFood) {
        payload = {
          error: 'Food does not exist.',
          status: 404
        }
        res.status(404).send(payload)
        return;
      }
        res.status(200).send(foundFood)
    })
    .catch(async error => {
      res.status(500).send({ error })
    })
})

router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  await food.create({
    name: req.body.name,
    calories: req.body.calories,
  })
    .then(async newFood => {
      res.status(201).send(newFood)
    })
    .catch(async error => {
      res.status(500).send({ error })
    })
});

module.exports = router;
