

const express = require('express');
const UserService = require('../services/user.service');
const upFile  = require('../services/s3.js')
const AWS = require('aws-sdk');


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
    // try{
      const body = req.body;
      //console.log('body backend')
      //console.log(req.body)
      const variable = await UserService.register_cognito(req,res);
      const result = await upFile.uploadFile(req.files.foto_perfil);
      const new_body = {
        ...body,
        foto_perfil:await upFile.getFileURL(req.files.foto_perfil.name),
      }
      const newCategory = await service.create(new_body);
      //console.log(variable)
    // }catch(e){
    //   console.log(e.message)
    //   res.status(400).json({message:e.message})
    // }

      // const urlfoto = upFile.getFileURL(req.files.foto_perfil.name)
      // console.log(req.files.foto_perfil.name)
      // console.log(urlfoto)
      // console.log(new_body)
      //console.log(newCategory)
      //res.status(201).json(newCategory);
  }
);

router.post('/login',
  async (req, res, next) => {
      const body = req.body;
      //console.log(body)
      try{
        const usuario = await UserService.login_cognito(req,res);
        res.json({usuario_logeado:usuario})
      }catch(e){
        console.log(e.message)
        res.status(400).json({message:e.message})
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

    const usr = await service.findOne(id);

    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_COG,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_COG,
      region: process.env.COGNITO_REGION,
    });

    const cognito = new AWS.CognitoIdentityServiceProvider();

    await cognito.adminDeleteUser({
      UserPoolId: "us-east-1_p0AEvda68",
      Username: usr.usuario,
    }, async (err, data) => {
      if (err) {
        res.json({ status: false, message: err.code });
      } else {
        // const usuario_eliminar = await service.findOne(id);
        // const params = {
        //   Bucket: process.env.AWS_BUCKET_NAME,
        //   Key: usuario_eliminar.foto_perfil.name
        // }
      
        // const command = new DeleteObjectCommand(params);
        // await varibles.s3Client.send(command);
        
        await service.delete(id);
        res.json({ status: true, message: "Se elimino exitosamente el usuario" });
      }
    });
      









  }
);

module.exports = router;