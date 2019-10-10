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
});

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
          message: 'Food not found.'
        }
        res.status(404).send(payload)
        return;
      }
        res.status(200).send(foundFood)
    })
    .catch(async error => {
      res.status(500).send({ error })
    })
});

/* POST single food */
router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  if (!req.body.name) {
    payload = {
      message: 'Name is a required field.'
    }
    res.status(400).send(payload)
    return;
  }

  if (!req.body.calories) {
    payload = {
      message: 'Calories is a required field.'
    }
    res.status(400).send(payload)
    return;
  }

  await food.create({
    name: req.body.name,
    calories: req.body.calories,
  })
    .then(async newFood => {
      res.status(201).send(newFood)
    })
    .catch(async error => {
      res.status(500).send({ error })
    });
});

/* PATCH single food */
router.patch('/:id', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  if (!req.body.name) {
    payload = {
      message: 'Name is a required field.'
    }
    res.status(400).send(payload)
    return;
  }

  if (!req.body.calories) {
    payload = {
      message: 'Calories is a required field.'
    }
    res.status(400).send(payload)
    return;
  }

  await food.update({
    name: req.body.name,
    calories: req.body.calories
  },
    { returning: true, where: { id: req.params.id } }
  )
    .then(async updatedFood => {
      res.status(200).send(updatedFood[1][0])
    })
    .catch(async error => {
      res.send(500).send({ error })
    })
});

/* DELETE single food */
router.delete('/:id', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  await food.destroy({
    where: { id: req.params.id }
  })
    .then(async destroyedFood => {
      if(destroyedFood === 1) {
        res.status(204).send()
        return;
      }
      res.status(404).send( { message: 'Food is not found.' } )
    })
    .catch(async error => {
      res.status(500).send({ error })
    });
});

module.exports = router;
