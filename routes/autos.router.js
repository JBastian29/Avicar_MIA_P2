const express = require('express');

const ViajesService = require('../services/autos.service');

const router = express.Router();
const service = new ViajesService();

router.get('/', async (req,res)=>{
    const autos = await service.find();
    res.json(autos);
})

router.post('/', async (req,res)=>{
    const body = req.body;
      const newVAutos = await service.create(body);
      res.status(201).json(newVAutos);
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
      res.status(201).json({id});
  }
);


module.exports = router;