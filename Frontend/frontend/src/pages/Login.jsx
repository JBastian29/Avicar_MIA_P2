import React, { useRef, useContext, useState } from 'react'
import '../estilos/slogin.css'
import Cookies from "universal-cookie"
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    // const displ = useRef(null);
    // const [userV, setUserV] = useState(true)
    const ruta_AWS = 'http://54.211.162.113:5000'

    const [error, setError] = useState(null);
    const form = useRef();


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const displData = new FormData(displ.current)
    //     const data = {
    //         userL: displData.get('username'),
    //         password: displData.get('password')
    //     }
    //     const pointBack = await fetch('http://localhost:5000/login', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             "carnet": data.userL,
    //             "password": data.password
    //         }),
    //     });

    //     const userLinfo = await pointBack.json()
    // }

    const [user, setUser] = useState({
        usuario: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleNavigate = () => {
        const usuario_logeado = cookies.get('session');
        if(usuario_logeado.usuario_logeado.user_type === "0"){
            navigate("/inicioAdmin");
        }else if(usuario_logeado.usuario_logeado.user_type === "1"){
            navigate("/inicioRecep");
        }else if(usuario_logeado.usuario_logeado.user_type === "2"){
            navigate("/inicio");
        }
        
    };

    const cookies = new Cookies();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("usuario",user.usuario);
        formdata.append("password",user.password);
        // const user = {
        //   usuario: formdata.get("usuario"),
        //   password: formdata.get("password"),
        // };
    
        const endpoint = await fetch(ruta_AWS+'/api/users/login', {
            method: "POST",
            body:formdata
            // headers: {
            //     "Content-Type": "application/json",
            // },
            // body: JSON.stringify({
            //     "usuario": user.usuario,
            //     "password": user.password
            // }),
        });

        const resp = await endpoint.json();
        if (endpoint.status === 400){
            setError(resp.message);
        }
        else{ 
            setError(null);
            cookies.set("session", resp);
            handleNavigate()
        }

        // const sesion = cookies.get('session')
        // console.log(sesion)
      };



    return (
        <div>
            <div class="popup-overlay"></div>
            <div class="popup">
                <form action="/" class="form1" ref={form} onSubmit={handleSubmit}>
                    <div class="form">
                        <div class="avatar">
                            <img src="https://bit.ly/31pHqJb" alt="" />
                        </div>
                        <div class="header">
                            Ingresa tus datos
                        </div>
                        <div class="element">
                            <label for="username">Username</label>
                            <input onChange={(e) => setUser({ ...user, usuario:e.target.value })} type="text" name="username"></input>
                        </div>
                        <div class="element">
                            <label for="password">Password</label>
                            <input onChange={(e) => setUser({ ...user, password:e.target.value })} type="password" name="password"></input>
                        </div>
                        <div class="element">
                            <button type="submit">Login</button>
                            
                        </div>
                        
                    </div>
                    
                </form>
            </div>
            {error ? <Alert variant="filled" severity="error">{error}</Alert> : ""}
        </div>
    )
}

export default Login