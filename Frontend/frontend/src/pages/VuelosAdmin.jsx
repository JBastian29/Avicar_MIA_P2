import React, { useEffect, useRef,useState } from 'react'
import '../estilos/sVuelosAdmin.css'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";


const VuelosAdmin = () => {


    useEffect(() => {getVuelos()}, [] );
    const ruta_AWS = 'http://54.211.162.113:5000'
    
    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);
    const [vuelo, setVuelo] = useState({
        nombre_agencia: "",
        ciudad_origen: "",
        ciudad_destino: "",
        dias_vuelo: "",
        precio_vuelo:"",
    })
    // const onButtonClick = (e, row) => {
    //     e.stopPropagation();
    //     setClickedRow(row);
    // };

    
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
                  color="error"
                  onClick={(e) => onButtonClick(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Delete
                </Button>
              );
            }
          },
      ];
      


      const getVuelos = async () =>{
        const endpoint_get = await fetch(ruta_AWS+'/api/viajes', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setRows(resp_get)
      }

      const onButtonClick = async (e,row) =>{
        e.preventDefault()
        setClickedRow(row);
        console.log('.........................')
        console.log(row)
        const endpoint_delete = await fetch(ruta_AWS+`/api/viajes/${row.id}`, {
            method: "DELETE"
        });
        
        getVuelos();
        



      };

      const handleVuelos = async (e) => {
        e.preventDefault()

        const formdata = new FormData();
        formdata.append("nombre_agencia",vuelo.nombre_agencia);
        formdata.append("ciudad_origen",vuelo.ciudad_origen);
        formdata.append("ciudad_destino",vuelo.ciudad_destino);
        formdata.append("dias_vuelo",vuelo.dias_vuelo);
        formdata.append("precio_vuelo",vuelo.precio_vuelo);
        const endpoint_post = await fetch(ruta_AWS+'/api/viajes', {
            method: "POST",
            body:formdata
        });

        getVuelos();
        document.getElementById("formVuelos").reset();
        

      };








    return (
        <div>
            <div class="popup-overlay2"></div>
            <div class="popups2">
                <form action="/" class="form3" id="formVuelos" onSubmit={handleVuelos}>
                    <div class="form">
                        <div class="avatar">
                            <img src="https://img.freepik.com/vector-premium/plantilla-sitio-web-pagina-vuelos-internacionales_124507-5929.jpg" alt="" />
                        </div>
                        <div class="header">
                            Completa informacion del vuelo
                        </div>

                        <div class="element">
                            <label for="username">Nombre de la agencia</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, nombre_agencia:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Ciudad de origen</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, ciudad_origen:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Ciudad de destino</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, ciudad_destino:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Dias de vuelo</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, dias_vuelo:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Precio de vuelo</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, precio_vuelo:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <button type="submit" >Cargar vuelo</button>
                        </div>
                    </div>
                </form>
                {/* {error ? <Alert variant="filled" severity="error">{error}</Alert> : ""} */}
            </div>
            <div class = "tablecontainer">
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
        
    )

}


export default VuelosAdmin