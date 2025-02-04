import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {Box} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";

function ListadoConcesionarios() {
  const [concesionarios, setConcesionarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getConcesionarios() {
      let response = await fetch("http://localhost:3000/api/concesionario", {method: "GET" ,  credentials: "include"});

      if (response.ok) {
        let data = await response.json();
        setConcesionarios(data.datos);
      }
    }

    getConcesionarios();
  }, []); 

  const handleDelete = async (id_concesionario) => {
    let response = await fetch("http://localhost:3000/api/concesionario/" + id_concesionario, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const concesionarioTrasBorrado = concesionarios.filter(
        (concesionario) => concesionario.id_concesionario != id_concesionario
      );
      // Establece los datos de nuevo para provocar un renderizado
      setConcesionarios(concesionarioTrasBorrado);
    }
  };
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de concesionarios
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>IDConcesionario</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Fundación</TableCell>
                <TableCell>Activo</TableCell>
                <TableCell>Modificar</TableCell>
                <TableCell>Borrar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {concesionarios.map((concesionario) => (
                <TableRow
                  key={concesionario.id_concesionario}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{concesionario.id_concesionario}</TableCell>
                  <TableCell>{concesionario.nombre}</TableCell>
                  <TableCell>{concesionario.direccion}</TableCell>
                  <TableCell>{concesionario.fecha_fundacion}</TableCell>
                  <TableCell>{concesionario.activo ? "Si" : "No"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarConcesionario/" + concesionario.id_concesionario)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(concesionario.id_concesionario)}
                      color="error"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoConcesionarios;
