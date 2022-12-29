

const express = require('express');
const UserService = require('../services/user.service');
const upFile  = require('../services/s3.js')

//const UserCognito = require('../services/user');
// const validatorHandler = require('../middleware/validator.handler');
// const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService.UserService();


router.get('/', async (req, res, next) => {
    const users = await service.find();
    res.json(users);
});

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

router.post('/registro',
  async (req, res, next) => {
      const body = req.body;
      await UserService.register_cognito(req,res);
      const new_body = {
        ...body,
        user_type:"2"
      }
      const newCategory = await service.create(new_body);
      console.log(req.files)
      const result = await upFile.uploadFile(req.files.foto_perfil);
      //console.log(newCategory)
      //res.status(201).json(newCategory);
  }
);

router.post('/login',
  async (req, res, next) => {
      const body = req.body;
      try{
        const usuario = await UserService.login_cognito(req,res);
        res.json({usuario_logeado:usuario})
      }catch(e){
        res.json({message:e.message})
      }
      //res.status(201).json(newCategory);
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