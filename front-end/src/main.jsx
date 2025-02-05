import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from './pages/Home.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router";
import PaginaError from './pages/PaginaError.jsx';
import AltaCoche from './components/AltaCoche.jsx';
import AltaConcesionario from './components/AltaConcesionario.jsx';
import ListadoCoches from './components/ListadoCoches.jsx';
import ListadoConcesionarios from './components/ListadoConcesionarios.jsx';
import ModificarCoche from './components/ModificarCoche.jsx';
import ModificarConcesionario from './components/ModificarConcesionario.jsx';
import BusquedaCoche from './components/BusquedaCoche.jsx';
import BusquedaConcesionario from './components/BusquedaConcesionario.jsx';
import MatriculaEncontrado from './components/MatriculaEncontrada.jsx';
import ConcesionarioEncontrado from './components/ConcesionarioEncontrado.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    errorElement : <PaginaError />,
    children: [   // Los hijos se renderizan en el elemento <Outlet /> del padre
      {
        path: "altaCoche",
        element: <AltaCoche />,
      },
      {
        path: "altaConcesionario",
        element: <AltaConcesionario />,
      },
      {
        path: "listaCoches",
        element: <ListadoCoches />,
      },
      {
        path: "listaConcesionarios",
        element: <ListadoConcesionarios />,
      },
      {
        path: "modificarCoche/:id",
        element: <ModificarCoche />,
      },
      {
        path: "modificarConcesionario/:id",
        element: <ModificarConcesionario />,
      },
      {
        path: "busquedaCoche",
        element: <BusquedaCoche />,
      },
      {
        path: "busquedaConcesionario",
        element: <BusquedaConcesionario />,
      },
      {
        path: "MatriculaEncontrada",
        element: <MatriculaEncontrado />,
      },
      {
        path: "ConcesionarioEncontrado",
        element: <ConcesionarioEncontrado />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
