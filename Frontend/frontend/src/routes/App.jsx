import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Home2 from "../pages/Home2";
import Singin from "../pages/Singin";
import Layout from "../containers/Layout";
import VuelosAdmin from "../pages/VuelosAdmin";
import AutosAdmin from "../pages/AutosAdmin";
import UsersAdmin from "../pages/UsersAdmin";
import HomeAdmin from "../pages/HomeAdmin";
import RecepSolis from "../pages/RecepSolis";
import TuristaSolis from "../pages/TuristaSolis";
import HistorialAdmin from "../pages/HistorialAdmin";
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import PagesVuelos from "../pages/PagesVuelos";
// import PagesAdmin from "../pages/PagesAdmin";
export const App = () => {
  return (
    <BrowserRouter>
        <Layout>
            <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/regis" element={<Singin />}/>
            <Route path="/inicio" element={<Home2 />}/>
            <Route path="/solispendientes" element={<TuristaSolis />}/>
            <Route path="/inicioAdmin" element={<HomeAdmin />}/>
            <Route path="/inicioRecep" element={<RecepSolis />}/>
            <Route path="/admin/vuelos" element={<VuelosAdmin />}/>
            <Route path="/admin/autos" element={<AutosAdmin />}/>
            <Route path="/admin/users" element={<UsersAdmin />}/>
            <Route path="/admin/historial" element={<HistorialAdmin />}/>
            



            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/vuelos" element={<PagesVuelos />} />
            <Route path="/admin" element={<PagesAdmin/>}></Route> */}
            </Routes>
        </Layout>   
    </BrowserRouter>
  );
};