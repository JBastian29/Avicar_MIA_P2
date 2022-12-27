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

module.exports = router;