import React,{useContext,useState,useEffect} from 'react'
import '../estilos/sRecepSolis.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
//import AppEnvr from '../enviroment/AppEnvr';

const RecepSolis = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://54.211.162.113:5000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const link_image = usuario_logeado?.usuario_logeado.foto_perfil

    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);


    const [servicio, setServicio] = useState({
        // id_servicio_solicitado: "",
        // id_turista: usuario_logeado.usuario_logeado.id,
        // tipo_servicio:"",
        // solicitante:usuario_logeado.usuario_logeado.usuario,
        estado_solicitud: false
    })

    useEffect(() => {getSolis()}, [] );



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'id_servicio_solicitado', headerName: 'ID servicio sol.', width: 130 },
        { field: 'id_turista', headerName: 'ID turista', width: 130 },
        { field: 'tipo_servicio', headerName: 'Tpo. servicio', width: 130, sortable: true },
        { field: 'solicitante', headerName: 'Usr. Solocitante', width: 130 },
        { field: 'estado_solicitud', headerName: 'Estado soli', width: 130 },
        {
            field: "acceptButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="success"
                  onClick={(e) => onAcceptClick(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Aceptar
                </Button>
              );
            }
          },
          {
            field: "denyButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="error"
                  onClick={(e) => onDenyClick(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Rechazar
                </Button>
              );
            }
          },
      ];


      const getSolis = async () =>{
        const endpoint_get = await fetch(ruta_AWS+'/api/solicitudes', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setRows(resp_get)
      }


      const onAcceptClick = async (e,row) =>{ //SOLICITUD DE VUELOS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        // formdata.append("id_servicio_solicitado",row.id);
        // formdata.append("id_turista",servicio.id_turista);
        // formdata.append("tipo_servicio","vuelo");
        // formdata.append("solicitante",servicio.solicitante);
        formdata.append("estado_solicitud",true);
        
        const endpoint = await fetch(ruta_AWS+`/api/solicitudes/${row.id}`, {
            method: "PATCH",
            body:formdata
        });
        getSolis()
        // e.preventDefault()
        // setClickedRow(row);
        // console.log('.........................')
        // console.log(row)
        // const endpoint_delete = await fetch(`http://localhost:5000/api/viajes/${row.id}`, {
        //     method: "DELETE"
        // });
        
        //getVuelos();
      };

      const onDenyClick = async (e,row) =>{ //SOLICITUD DE VUELOS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        // formdata.append("id_servicio_solicitado",row.id);
        // formdata.append("id_turista",servicio.id_turista);
        // formdata.append("tipo_servicio","vuelo");
        // formdata.append("solicitante",servicio.solicitante);
        formdata.append("estado_solicitud",false);
        
        const endpoint = await fetch(ruta_AWS+`/api/solicitudes/${row.id}`, {
            method: "PATCH",
            body:formdata
        });
        getSolis()
      };





    return (
        


        <div>
            <div class="pCuadradoR2">
            <div class = "tablecontainer45">
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
            </div>
            <div class="sCuadradoR2">
                <h1>Bienvenido </h1>
                <h2>{usuario_logeado.usuario_logeado.usuario}</h2><br></br>
                <img src={link_image} alt="" width="200" height="200"></img>
            </div>
        </div>
    )
}

export default RecepSolis