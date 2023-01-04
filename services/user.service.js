const boob = require('@hapi/boom')
const { signUpCognito, signInCognito } = require("./cognito");
//const { uploadFile } = require("../middleware/bucket");
users = []
id = 0
const register_cognito = async (req, res) => {
  const { usuario, password } = req.body;
  console.log('Datos recibidos', usuario, password)


  const userName_exists = users.filter(item => item.usuario === usuario);
  if(userName_exists.length != 0){
    //console.log('-------revisando registro----------')
    //console.log(userName_exists)
    //console.log(userName_exists[0].id)
    const index = users.findIndex(item => item.id === +userName_exists[0].id);
    //console.log(index)
    users.splice(index, 1)
  }
  
  //-----
  // aqui hacer la validacion de que no se encuentre el usuario en la estructura de datos
  //-----

  await signUpCognito(req,res);

    
  //console.log(resposeCognito)
  //subir una foto
  //await uploadFile(req,res);
  // return res.json({
  //   status: true,
  //   msg: "Usuario registrado",
  //   usuario,
  //   password
  // });
  
}

//login
const login_cognito = async (req, res) => {
  let { usuario, password } = req.body;
  console.log('Datos recibidos login', usuario);
  let user_recibido = users.find(item => item.email === usuario);
  if(user_recibido){
    if(user_recibido.email === usuario){
    usuario = user_recibido.usuario
    } 
  }
  
  //-----
  // aqui hacer la validacion de que se encuentre el usuario en la estructura de datos
  await signInCognito(req,res);
  const userName = users.find(item => item.usuario === usuario);
  if(!userName){
    return {message: "Username: " + userName + ", no existe"}
  }

  return userName
  //-----
  //Mandar a traer de cognito
}


class UserService {
    

  constructor() {}

  async create(data) {
    id++;
    const newUser = {
        id: id,
        ...data
    }
    users.push(newUser);
    return newUser;
  }

  async find() {
    return users;
  }

  async findOne(id) {
    const userEncontrado = users.find(item => item.id === +id);
    if (!userEncontrado) {
      return {message: "User con id: " + id + ", no existe"}
    }
    return userEncontrado;
  }


  async update(id, changes) {
    const index = users.findIndex(item => item.id === +id);
    if (index === -1) {
      return {message: "User con id: " + id + ", no existe"}
    }
    const new_viaje = users[index];
    users[index] = {
      ...new_viaje,
      ...changes
    };
    return users[index];
  }

  async delete(id) {
    const index = users.findIndex(item => item.id === +id);
    if (index === -1) {
      return {message: "User con id: " + id + ", no existe"}
    }
    users.splice(index, 1);
    return { id };
  }
}

module.exports = {
  UserService,
  register_cognito,
  login_cognito
}
