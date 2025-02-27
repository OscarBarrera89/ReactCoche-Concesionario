import { useLocation } from "react-router";
import { Button, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

/**
 * Componente para mostrar la información de un concesionario encontrado por nombre.
 * @returns {JSX.Element} El componente de concesionario encontrado.
 */
function ConcesionarioEncontrado() {
  const location = useLocation();
  const concesionario = location.state?.concesionario;
  const navigate = useNavigate();

  if (!concesionario) {
    return <Typography variant="h5">No se encontró información del concesionario.</Typography>;
  }

  /**
   * Maneja la eliminación de un concesionario.
   * @param {number} id_concesionario - El ID del concesionario a eliminar.
   */
  const handleDelete = async (id_concesionario) => {
    let response = await fetch(apiUrl +  "/concesionario/" + id_concesionario, {
      method: "DELETE",
    });

    if (response.ok) {
      navigate("/busquedaConcesionario");
    }
  };

  return (
    <>
    <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de concesionarios
      </Typography>

      <Grid2 size={{ xs: 12, sm: 6, md: 4 }} mx={4}>
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
                <TableRow
                  key={concesionario.id_concesionario}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{concesionario.id_concesionario}</TableCell>
                  <TableCell>{concesionario.nombre}</TableCell>
                  <TableCell>{concesionario.direccion}</TableCell>
                  <TableCell>{concesionario.fecha_fundacion}</TableCell>
                  <TableCell>{concesionario.activo ? "Activo" : "No activo"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarconcesionario/" + concesionario.id_concesionario)}
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
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </>
  );
}

export default ConcesionarioEncontrado;
