const boob = require('@hapi/boom')
const { signUpCognito, signInCognito } = require("./cognito");
//const { uploadFile } = require("../middleware/bucket");
users = []
id = 0
const register_cognito = async (req, res) => {
  const { usuario, password } = req.body;
  console.log('Datos recibidos', usuario, password)
  
  //-----
  // aqui hacer la validacion de que no se encuentre el usuario en la estructura de datos
  //-----

  await signUpCognito(req,res);
  //subir una foto
  //await uploadFile(req,res);

  return res.json({
      status: true,
      msg: "Usuario registrado",
      usuario,
      password
  });
}

//login
const login_cognito = async (req, res) => {
  let { usuario, password } = req.body;
  console.log('Datos recibidos login', usuario);
  let user_recibido = users.find(item => item.email === usuario);
  if(user_recibido){
    if(user_recibido.email === usuario){
    console.log("entre if")
    usuario = user_recibido.usuario
    } 
  }
  
  //-----
  // aqui hacer la validacion de que se encuentre el usuario en la estructura de datos
  await signInCognito(req,res);
  console.log("ya salio")
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

  async login_comprobation(id) {
    
    const userEmail = users.find(item => item.email === email);
    const userPassword = users.find(item => item.password === password);
    

    return userEncontrado;
  }




  async update(id, changes) {
    const index = users.findIndex(item => item.id === +id);
    if (index === -1) {
      return "User con id: " + id + ", no existe"
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
      return "User con id: " + id + ", no existe"
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
