const express = require('express');

const ViajesService = require('../services/viajes.service');

const router = express.Router();
const service = new ViajesService();

router.get('/', async (req,res)=>{
    const viajes = await service.find();
    res.json(viajes);
})

router.post('/', async (req,res)=>{
      const body = req.body;
      const newViajes = await service.create(body);
      res.status(201).json(newViajes);
})

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
    async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
  }
);

router.delete('/:id',
async (req, res, next) => {
      const { id } = req.params;
      await service.delete(id);
      console.log('ya elimine')
      res.status(201).json({id});
  }
);


module.exports = router;