import React,{useContext,useState,useEffect} from 'react'
import '../estilos/sHome2.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
//import AppEnvr from '../enviroment/AppEnvr';

const Home2 = () => {
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

    useEffect(() => {getVuelos()}, [] );
    useEffect(() => {getAutos()}, [] );



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre_agencia', headerName: 'Nombre Agc.', width: 130 },
        { field: 'ciudad_origen', headerName: 'Cd. Origen', width: 130 },
        { field: 'ciudad_destino', headerName: 'Cd. Destino', width: 130 },
        { field: 'dias_vuelo', headerName: 'Dias vuelo', width: 130 },
        { field: 'precio_vuelo', headerName: 'Precio', width: 130 },
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
                  Reservar
                </Button>
              );
            }
          },
      ];

      const columns2 = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre_agencia', headerName: 'Nombre Agc.', width: 130 },
        { field: 'marca', headerName: 'Marca', width: 130 },
        { field: 'placa', headerName: 'Placa', width: 130 },
        { field: 'modelo', headerName: 'Modelo', width: 130 },
        { field: 'precio', headerName: 'Precio', width: 130 },
        { field: 'ciudad_localizado', headerName: 'Cd. localizado', width: 130 },
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
                  onClick={(e) => onButtonClick2(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Reservar
                </Button>
              );
            }
          },
      ];

      const getVuelos = async () =>{
        const endpoint_get = await fetch('http://localhost:5000/api/viajes', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setRows(resp_get)
      }

      const getAutos = async () =>{
        const endpoint_get = await fetch('http://localhost:5000/api/autos', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setRows2(resp_get)
      }

      const onButtonClick = async (e,row) =>{ //SOLICITUD DE VUELOS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        // const formdata = new FormData();
        // formdata.append("id_servicio_solicitado",row.id);
        // formdata.append("id_turista",servicio.id_turista);
        // formdata.append("tipo_servicio","vuelo");
        // formdata.append("solicitud",row);
        // formdata.append("solicitante",servicio.solicitante);
        // formdata.append("estado_solicitud",servicio.estado_solicitud);

        const solicitud = {
          id_servicio_solicitado:row.id,
          id_turista:servicio.id_turista,
          tipo_servicio: "vuelo",
          solicitud: row,
          solicitante: servicio.solicitante,
          estado_solicitud: servicio.estado_solicitud
        }
        
        const endpoint = await fetch('http://localhost:5000/api/solicitudes', {
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
              },
            body:JSON.stringify(solicitud)
        });
        // e.preventDefault()
        // setClickedRow(row);
        // console.log('.........................')
        // console.log(row)
        // const endpoint_delete = await fetch(`http://localhost:5000/api/viajes/${row.id}`, {
        //     method: "DELETE"
        // });
        
        //getVuelos();
      };

      const onButtonClick2 = async (e,row) =>{ //SOLICITUD DE AUTOS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        // const formdata = new FormData();
        // formdata.append("id_servicio_solicitado",row.id);
        // formdata.append("id_turista",servicio.id_turista);
        // formdata.append("tipo_servicio","auto");
        // formdata.append("solicitud",row)
        // formdata.append("solicitante",servicio.solicitante);
        // formdata.append("estado_solicitud",servicio.estado_solicitud);
        
        const solicitud = {
          id_servicio_solicitado:row.id,
          id_turista:servicio.id_turista,
          tipo_servicio: "auto",
          solicitud: row,
          solicitante: servicio.solicitante,
          estado_solicitud: servicio.estado_solicitud
        }

        const endpoint = await fetch('http://localhost:5000/api/solicitudes', {
          method: "POST",
          headers: {
                "Content-Type": "application/json",
            },
          body:JSON.stringify(solicitud)
        });
        // e.preventDefault()
        // setClickedRow2(row);
        // console.log('.........................')
        // console.log(row)
        // const endpoint_delete = await fetch(`http://localhost:5000/api/autos/${row.id}`, {
        //     method: "DELETE"
        // });
        
        //getVuelos();
      };



    return (
        


        <div>
            <div class="pCuadrado2">
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
            <div class="sCuadrado2">
                <h1>Bienvenido </h1>
                <h2>{usuario_logeado.usuario_logeado.usuario}</h2><br></br>
                <img src={link_image} alt="" width="200" height="200"></img>
            </div>
        </div>
    )
}

export default Home2