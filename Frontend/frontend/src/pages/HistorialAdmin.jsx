import React,{useContext,useState,useEffect} from 'react'
import '../estilos/sHistorialAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
//import AppEnvr from '../enviroment/AppEnvr';

const HistorialAdmin = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const link_image = usuario_logeado?.usuario_logeado.foto_perfil

    const [clickedRow, setClickedRow] = useState();
    const [clickedRow2, setClickedRow2] = useState();
    const [rows,setRows] = useState([]);
    const [rows2,setRows2] = useState([]);

    const [servicio, setServicio] = useState({
        id_servicio_solicitado: "",
        id_turista: usuario_logeado.usuario_logeado.id,
        tipo_servicio:"",
        servicio: null,
        solicitante:usuario_logeado.usuario_logeado.usuario,
        estado_solicitud: false
    })

    useEffect(() => {getUsers()}, [] );



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'usuario', headerName: 'Usuario', width: 130 },
        { 
            field: 'foto_perfil', 
            headerName: 'Foto perfil', 
            width: 130,
            renderCell: (params) => {
                console.log(params)
                return (
                  <>
                    <Avatar src={params.row.foto_perfil} />
                    
                  </>
                );
              }
        },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'password', headerName: 'Password', width: 130 },
        { field: 'pass_confirm', headerName: 'Pass_confrm', width: 130 },
        { field: 'user_type', headerName: 'Tipo Usuario', width: 130 },
        {
            field: "deleteButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="secondary"
                  onClick={(e) => onButtonClick(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Consultar
                </Button>
              );
            }
          },
      ];

      const columns2 = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre_agencia', headerName: 'Nombre Agc.', width: 130 },
        { field: 'ciudad_origen', headerName: 'Cd. Origen', width: 130 },
        { field: 'ciudad_destino', headerName: 'Cd. Destino', width: 130 },
        { field: 'dias_vuelo', headerName: 'Dias vuelo', width: 130 },
        { field: 'precio_vuelo', headerName: 'Precio', width: 130 },
        { field: 'estado_solicitud', headerName: 'Estado Solctd.', width: 130 },
      ];



      const getUsers = async () =>{
        const endpoint_get = await fetch('http://localhost:5000/api/users', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setRows(resp_get)
      }



      const onButtonClick = async (e,row) =>{ //SOLICITUD DE VUELOS-----------------------------
        e.preventDefault();
        const endpoint_get = await fetch(`http://localhost:5000/api/solicitudes/soliVuelo/${row.id}`, {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        console.table(resp_get)
        setRows2(resp_get)
      };


    return (
        


        <div>
            <div class="pCuadradoH2">
            <div class = "tablecontainer1">
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                </div>
            </div>
            <div class = "tablecontainer2">
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
            <div class="sCuadradoH2">
                <h1>Bienvenido </h1>
                <h2>{usuario_logeado.usuario_logeado.usuario}</h2><br></br>
                <img src={link_image} alt="" width="200" height="200"></img>
            </div>
        </div>
    )
}

export default HistorialAdmin