const AmamazonCognitoIdentity = require('amazon-cognito-identity-js');
require('dotenv').config();

const cognito = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
}

const userPool = new AmamazonCognitoIdentity.CognitoUserPool(cognito);

const signUpCognito = async(req, res) => {
    const { usuario, password, email } = req.body;
    // aqui pueden encriptar la contrasenia con bcrypt o algo similar
    const attributeList = [];
    // attributeList.push(new AmamazonCognitoIdentity.CognitoUserAttribute({'': username}));
    attributeList.push(new AmamazonCognitoIdentity.CognitoUserAttribute({'Name': 'email', 'Value': email}));
    const username=usuario;
    userPool.signUp(username, password, attributeList, null, async(err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send
        }else{
            console.log(data)
            // res.status(200).send(data);
        }
    });
}

const signInCognito = async(req, res) => {
    const {usuario, password} = req.body;
    
    const authenticationDetails = new AmamazonCognitoIdentity.AuthenticationDetails({
        Username: usuario,
        Password: password
    });

    const userData = {
        Username: usuario,
        Pool: userPool
    };

    const cognitoUser = new AmamazonCognitoIdentity.CognitoUser(userData);

    return new Promise((resolve, reject) => {
        return cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            resolve(result);
        },
        onFailure: (err) => {
            reject(err);
        },
        });
    });

    // cognitoUser.authenticateUser(authenticationDetails, {
    //     onSuccess: function (result) {
    //         const verified = result;
    //         console.log(verified);
    //         res.status(200).json({
    //             'status': true,
    //             'msg':result
    //         });
    //     },
    //     onFailure: function (err) {
    //         console.log('Entra aqui con error: ' + err);
    //         res.status(500).json({
    //             'status': false,
    //             'msg':err
    //             });
    //     }
    // });
}

const deleteUserCognitoA = async (req, res) => {
    const username = req.body.us
    const password = req.body.contranueva

    const hash = crypto.createHash('sha256').update(password).digest('hex') + "D**";

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: hash
    });
    
    const userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            cognitoUser.deleteUser((err, result) => {
                if (err) {
                    res.status(400).json({
                        status: false,
                        message: 'Error al eliminar usuario',
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        message: 'Usuario eliminado correctamente',
                    });
                }
            });
        },
        onFailure: function (err) {
            console.log('Entra aqui con error: ' + err);
            res.status(500).json({
                'status': false,
                'msg':err
                });
        }
    });
}

module.exports = {
    signUpCognito,
    signInCognito,
    deleteUserCognitoA
}