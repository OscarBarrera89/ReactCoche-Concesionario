import { useLocation } from "react-router";
import { Button, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";

function MatriculaEncontrada() {
  const location = useLocation();
  const coche = location.state?.coche;
  const navigate = useNavigate();
  const [concesionarios, setConcesionarios] = useState([]);
  
  useEffect(() => {
      async function getConcesionarios() {
        let response = await fetch(apiUrl +  "/concesionario", {method: "GET" ,  credentials: "include"});
  
        if (response.ok) {
          let data = await response.json();
          setConcesionarios(data.datos);
        }
      }
  
      getConcesionarios();
    }, []);

  if (!coche) {
    return <Typography variant="h5">No se encontró información del coche.</Typography>;
  }

  const handleDelete = async (id_coche) => {
    let response = await fetch(apiUrl +  "/coche/" + id_coche, {
      method: "DELETE",
    });

    if (response.ok) {
      navigate("/busquedaCoche");
    }
  };
  return (
    <>
    <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de coches
      </Typography>

      <Grid2 size={{ xs: 12, sm: 6, md: 4 }} mx={4}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">IDCoche</TableCell>
                <TableCell>Concesionario</TableCell>
                <TableCell>Matrícula</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Disponible</TableCell>
                <TableCell>Fecha de registro</TableCell>
                <TableCell>Modificar</TableCell>
                <TableCell>Borrar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                  key={coche.id_coche}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{coche.id_coche}</TableCell>
                  <TableCell>{concesionarios.map((concesionario => (
                    concesionario.id_concesionario === coche.id_concesionario ? concesionario.nombre : ""
                  )))}</TableCell>
                  <TableCell>{coche.matricula}</TableCell>
                  <TableCell>{coche.modelo}</TableCell>
                  <TableCell>{coche.precio + " €"}</TableCell>
                  <TableCell>{coche.disponible ? "Disponible" : "No disponible"}</TableCell>
                  <TableCell>{coche.fecha_registro}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarCoche/" + coche.id_coche)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(coche.id_coche)}
                      color="error"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </>
  );
}

export default MatriculaEncontrada;
