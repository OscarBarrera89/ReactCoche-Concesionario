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

function ListadoCoches() {
  const [coches, setCoches] = useState([]);
  const [concesionarios, setConcesionarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCoches() {
      let response = await fetch("http://localhost:3000/api/coche", {method: "GET" ,  credentials: "include"});

      if (response.ok) {
        let data = await response.json();
        setCoches(data.datos);
      }
    }

    getCoches();
  }, []);
  
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

  const handleDelete = async (id_coche) => {
    let response = await fetch("http://localhost:3000/api/coche/" + id_coche, {
      method: "DELETE",
    });

    if (response.ok) {
      const cocheTrasBorrado = coches.filter(
        (coche) => coche.id_coche != id_coche
      );
      setCoches(cocheTrasBorrado);
    }
  };
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de coches
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>IDCoche</TableCell>
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
              {coches.map((coche) => (
                <TableRow
                  key={coche.id_coche}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{coche.id_coche}</TableCell>
                  <TableCell>{concesionarios.map((concesionario => (
                    concesionario.id_concesionario === coche.id_concesionario ? concesionario.nombre : ""
                  )))}</TableCell>
                  <TableCell>{coche.matricula}</TableCell>
                  <TableCell>{coche.modelo}</TableCell>
                  <TableCell>{coche.precio + " €"}</TableCell>
                  <TableCell>{coche.disponible ? "Si" : "No"}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoCoches;
