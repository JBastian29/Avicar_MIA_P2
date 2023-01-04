import React, { useEffect, useRef,useState } from 'react'
import '../estilos/sUsersAdmin.css'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';


const UsersAdmin = () => {


    useEffect(() => {getVuelos()}, [] );
    const [value, setValue] = useState(false);
    const [error, setError] = useState(null);
    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);
    const [user, setUser] = useState({
        nombre: "",
        usuario: "",
        foto_perfil: null,
        email: "",
        password: "",
        pass_confirm:"",
        user_type: null
    })
    // const onButtonClick = (e, row) => {
    //     e.stopPropagation();
    //     setClickedRow(row);
    // };

    
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
        const endpoint_get = await fetch('http://localhost:5000/api/users', {
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
        const endpoint_delete = await fetch(`http://localhost:5000/api/users/${row.id}`, {
            method: "DELETE"
        });
        
        getVuelos();
      };

      const handleVuelos = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("nombre",user.nombre);
        formData.append("usuario",user.usuario);
        formData.append("foto_perfil",user.foto_perfil);
        formData.append("email",user.email);
        formData.append("password",user.password);
        formData.append("pass_confirm",user.pass_confirm);
        formData.append("user_type",user.user_type);

        const endpoint = await fetch('http://localhost:5000/api/users/registro', {
            method: "POST",
            body:formData
        });

        const resp = await endpoint.json();
        if (endpoint.status === 400){
            setError(resp.message);
        }
        else{ 
            setError(null);
            alert("¡Registrado correctamente!")
            getVuelos();
        }

        
        document.getElementById("formVuelos").reset();
        

      };








    return (
        <div>
            <div class="popup-overlay4"></div>
            <div class="popups4">
                <form action="/" class="form5" id="formVuelos" onSubmit={handleVuelos}>
                    <div class="form">
                    <div class="avatar">
                            <img src="https://yt3.ggpht.com/ytc/AKedOLTOxCzheuyu7Cw8Hsm1TvLlbekMeVVrE1c5zL6h=s900-c-k-c0x00ffffff-no-rj" alt="" />
                        </div>
                        <div class="header">
                            Informacion del nuevo usuario
                        </div>
                        <div class="element">
                            <label for="username">Nombre</label>
                            <input onChange={(e) => setUser({ ...user, nombre:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>
                        <div class="element">
                            <label for="password">Usuario</label>
                            <input onChange={(e) => setUser({ ...user, usuario:e.target.value })}  type="text" name="usuario" id="Usuario"></input>
                        </div>
                        <div class="element">
                            <label for="password">Foto perfil</label>
                            <input onChange={(e) => setUser({ ...user, foto_perfil:e.target.files[0] })}  type="file" name="f_Perfil" id="fo_Perfil"></input>
                        </div>
                        <div class="element">
                            <label for="password">Email</label>
                            <input onChange={(e) => setUser({ ...user, email:e.target.value })}  type="text" name="email" id="Email"></input>
                        </div>
                        <div class="element">
                            <label for="password">Password</label>
                            <input onChange={(e) => setUser({ ...user, password:e.target.value })}  type="password" name="password" id="Password"></input>
                        </div>
                        <div class="element">
                            <label for="password">Confirmar Password</label>
                            <input onChange={(e) => setUser({ ...user, pass_confirm:e.target.value })}  type="password" name="c_password" id="C_password"></input>
                        </div>

                        <div class="element">
                            <label for="password">Tipo usuario</label>
                            <input onChange={(e) => setUser({ ...user, user_type:e.target.value })}  type="text" name="t_user" id="T_user"></input>
                        </div>

                        <div class="element">
                            <button type="submit" >Registrar</button>
                        </div>
                        

                    </div>
                    
                </form>
                
                {/* {error ? <Alert variant="filled" severity="error">{error}</Alert> : ""} */}
                
            </div>
            {error ? <Alert variant="filled" severity="error">{error}</Alert> : ""}
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


export default UsersAdmin