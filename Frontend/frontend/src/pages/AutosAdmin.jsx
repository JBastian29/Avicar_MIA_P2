import React, { useEffect, useRef,useState } from 'react'
import '../estilos/sAutosAdmin.css'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";


const AutosAdmin = () => {


    useEffect(() => {getVuelos()}, [] );
    
    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);
    const [vuelo, setVuelo] = useState({
        nombre_agencia: "",
        marca: "",
        placa: "",
        modelo: "",
        precio:"",
        ciudad_localizado:"",
    })
    // const onButtonClick = (e, row) => {
    //     e.stopPropagation();
    //     setClickedRow(row);
    // };

    
    const columns = [
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
        const endpoint_get = await fetch('http://localhost:5000/api/autos', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setRows(resp_get)
      }

      const onButtonClick = async (e,row) =>{
        e.preventDefault()
        setClickedRow(row);
        const endpoint_delete = await fetch(`http://localhost:5000/api/autos/${row.id}`, {
            method: "DELETE"
        });
        
        getVuelos();
        



      };

      const handleVuelos = async (e) => {
        e.preventDefault()

        const formdata = new FormData();
        formdata.append("nombre_agencia",vuelo.nombre_agencia);
        formdata.append("marca",vuelo.marca);
        formdata.append("placa",vuelo.placa);
        formdata.append("modelo",vuelo.modelo);
        formdata.append("precio",vuelo.precio);
        formdata.append("ciudad_localizado",vuelo.ciudad_localizado);
        const endpoint_post = await fetch('http://localhost:5000/api/autos', {
            method: "POST",
            body:formdata
        });

        getVuelos();
        document.getElementById("formVuelos").reset();
        

      };








    return (
        <div>
            <div class="popup-overlay3"></div>
            <div class="popups3">
                <form action="/" class="form4" id="formVuelos" onSubmit={handleVuelos}>
                    <div class="form">
                        <div class="avatar">
                            <img src="https://cdn-icons-png.flaticon.com/512/4662/4662012.png" alt="" />
                        </div>
                        <div class="header">
                            Completa informacion del vehiculo
                        </div>

                        <div class="element">
                            <label for="username">Nombre de la agencia</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, nombre_agencia:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Marca</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, marca:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Placa</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, placa:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Modelo</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, modelo:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Precio</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, precio:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <label for="username">Ciudad localizado</label>
                            <input onChange={(e) => setVuelo({ ...vuelo, ciudad_localizado:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>

                        <div class="element">
                            <button type="submit" >Cargar vehiculo</button>
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


export default AutosAdmin