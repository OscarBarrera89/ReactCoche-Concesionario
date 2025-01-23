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



let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    // errorElement : <PaginaError />,
    children: [   // Los hijos se renderizan en el elemento <Outlet /> del padre
      // {
      //   path: "listadoplatos",
      //   element: <App />,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
