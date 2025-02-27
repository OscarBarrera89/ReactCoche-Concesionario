import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

/**
 * Componente para listar los concesionarios.
 * @returns {JSX.Element} El componente de listado de concesionarios.
 */
function ListadoConcesionarios() {
  const [concesionarios, setConcesionarios] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [concesionarioPorPagina] = useState(5);
  const navigate = useNavigate();

  const ultimoConcesionario = pagina * concesionarioPorPagina;
  const primerConcesionario = ultimoConcesionario - concesionarioPorPagina;
  const concesionariosMostrados = concesionarios.slice(primerConcesionario, ultimoConcesionario);

  // Obtener la lista de concesionarios al cargar el componente
  useEffect(() => {
    async function getConcesionarios() {
      let response = await fetch(apiUrl +  "/concesionario", {method: "GET"});

      if (response.ok) {
        let data = await response.json();
        setConcesionarios(data.datos);
      }
    }

    getConcesionarios();
  }, []); 

  /**
   * Maneja la eliminación de un concesionario.
   * @param {number} id_concesionario - El ID del concesionario a eliminar.
   */
  const handleDelete = async (id_concesionario) => {
    let response = await fetch(apiUrl +  "/concesionario/" + id_concesionario, {
      method: "DELETE",
    });

    if (response.ok) {
      const concesionarioTrasBorrado = concesionarios.filter(
        (concesionario) => concesionario.id_concesionario != id_concesionario
      );
      setConcesionarios(concesionarioTrasBorrado);
    }
  };

  /**
   * Maneja el cambio de página en la paginación.
   * @param {Event} event - El evento de cambio de página.
   * @param {number} value - El número de la nueva página.
   */
  const handlePageChange = (event, value) => {
    setPagina(value);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de concesionarios
      </Typography>

      <Grid size={{ xs: 12, sm: 6, md: 4 }} mx={4}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">IDConcesionario</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Fundación</TableCell>
                <TableCell>Activo</TableCell>
                <TableCell>Modificar</TableCell>
                <TableCell>Borrar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {concesionariosMostrados.map((concesionario) => (
                <TableRow
                  key={concesionario.id_concesionario}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{concesionario.id_concesionario}</TableCell>
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
        <Pagination
          count={Math.ceil(concesionarios.length / concesionarioPorPagina)}
          page={pagina}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        />
      </Grid>
    </>
  );
}

export default ListadoConcesionarios;
