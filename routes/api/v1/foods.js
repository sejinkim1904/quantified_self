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

module.exports = router;
