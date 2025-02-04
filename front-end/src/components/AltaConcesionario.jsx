import {
  Typography,
  TextField,
  Stack,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AltaConcesionario(){
  const [concesionario, setConcesionario] = useState({
      id_concesionario: "",
      nombre: "",
      direccion: "",
      fecha_fundacion: "",
      activo: "",
    });
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/api/concesionario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(concesionario),
        });
        if (response.ok) {
          const respuesta = await response.json();
          alert(respuesta.mensaje);
          if (respuesta.ok) {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al registrar el concesionario");
      }
    };
  
    const handleChange = (e) => {
      setConcesionario({
        ...concesionario,
        [e.target.name]: e.target.value,
      });
    };
  
    return (
      <>
        <Typography variant="h4" align="center" sx={{ mt: 2 }}>
          Alta de concesionarios
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
              <TextField
                label="Nombre"
                type="text"
                name="nombre"
                value={concesionario.nombre}
                onChange={handleChange}
              />
              <TextField
                type="text"
                label="Direccion"
                name="direccion"
                value={concesionario.direccion}
                onChange={handleChange}
              />
              <TextField
                type="date"
                label="Fecha de Fundación"
                name="fecha_fundacion"
                value={concesionario.fecha_fundacion}
                onChange={handleChange}
              />
              <Select
                name="activo"
                value={concesionario.activo}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Seleccionar estado
                </MenuItem>
                <MenuItem value={true}>Activo</MenuItem>
                <MenuItem value={false}>Inactivo</MenuItem>
              </Select>
              <Button variant="contained" type="submit">
                <AddCircleIcon />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
}
export default AltaConcesionario;
