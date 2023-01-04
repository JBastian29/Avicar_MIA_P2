import React,{useContext,useState,useEffect} from 'react'
import '../estilos/HomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
//import AppEnvr from '../enviroment/AppEnvr';

const HomeAdmin = () => {

    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const link_image = usuario_logeado?.usuario_logeado.foto_perfil
    

    return (
        


        <div>
            <div class="pCuadradoA2"></div>
            <div class="sCuadradoA2">
                <h1>Bienvenido </h1>
                <h2>{usuario_logeado.usuario_logeado.usuario}</h2><br></br>
                <img src={link_image} alt="" width="200" height="200"></img>
            </div>
        </div>
    )
}

export default HomeAdmin