import { Button, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function ModificarConcesionario(){

    const params = useParams();
    const navigate = useNavigate();
    const [concesionario, setConcesionario] = useState({
          id_concesionario: params.id,
          nombre: "",
          direccion: "",
          fecha_fundacion: new Date(),
          activo: false,
        });

  useEffect(() => {
    async function getConcesionario() {
      let response = await fetch("http://localhost:3000/api/concesionario/"+ concesionario.id_concesionario);
      if (response.ok) {
        let data = await response.json();
        setConcesionario(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/");
      }
    }

    getConcesionario();
  }, [concesionario.id_concesionario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/api/concesionario/"+ concesionario.id_concesionario, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(concesionario), 
        });

        if (response.ok) {
          alert("Actualización correcta");
          navigate(-1);
        } else {
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setConcesionario((concesionario) => ({
      ...concesionario,
      [name]: value,
    }));
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
                Aceptar Modificacion
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
}
export default ModificarConcesionario;