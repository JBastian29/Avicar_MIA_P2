import React,{useContext,useState,useEffect} from 'react'
import '../estilos/sTuristaSolis.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
//import AppEnvr from '../enviroment/AppEnvr';

const TuristaSolis = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const link_image = usuario_logeado?.usuario_logeado.foto_perfil

    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);
    const [rows2,setRows2] = useState([]);


    const [servicio, setServicio] = useState({
        id_servicio_solicitado: "",
        id_turista: usuario_logeado.usuario_logeado.id,
        tipo_servicio:"",
        solicitante:usuario_logeado.usuario_logeado.usuario,
        estado_solicitud: false
    })

    useEffect(() => {getSolisVuelo()}, [] );
    useEffect(() => {getSolisAuto()}, [] );



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre_agencia', headerName: 'Nombre Agc.', width: 130 },
        { field: 'ciudad_origen', headerName: 'Cd. Origen', width: 130 },
        { field: 'ciudad_destino', headerName: 'Cd. Destino', width: 130 },
        { field: 'dias_vuelo', headerName: 'Dias vuelo', width: 130 },
        { field: 'precio_vuelo', headerName: 'Precio', width: 130 },
        { field: 'estado_solicitud', headerName: 'Estado Solctd.', width: 130 },
      ];

      const columns2 = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre_agencia', headerName: 'Nombre Agc.', width: 130 },
        { field: 'marca', headerName: 'Marca', width: 130 },
        { field: 'placa', headerName: 'Placa', width: 130 },
        { field: 'modelo', headerName: 'Modelo', width: 130 },
        { field: 'precio', headerName: 'Precio', width: 130 },
        { field: 'ciudad_localizado', headerName: 'Cd. localizado', width: 130 },
        { field: 'estado_solicitud', headerName: 'Estado Solctd.', width: 130 },
      ];


      const getSolisVuelo = async () =>{
        const endpoint_get = await fetch(`http://localhost:5000/api/solicitudes/soliVuelo/${usuario_logeado.usuario_logeado.id}`, {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        console.table(resp_get)
        setRows(resp_get)
      }

      const getSolisAuto = async () =>{
        const endpoint_get = await fetch(`http://localhost:5000/api/solicitudes/soliAuto/${usuario_logeado.usuario_logeado.id}`, {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        console.table(resp_get)
        setRows2(resp_get)
      }


    return (
        


        <div>
            <div class="pCuadradoT2">
            <div class = "tablecontainer46">
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows2}
                        columns={columns2}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                </div>
            </div>
            </div>
            <div class="sCuadradoT2">
                <h1>Bienvenido </h1>
                <h2>{usuario_logeado.usuario_logeado.usuario}</h2><br></br>
                <img src={link_image} alt="" width="200" height="200"></img>
            </div>
        </div>
    )
}

export default TuristaSolis