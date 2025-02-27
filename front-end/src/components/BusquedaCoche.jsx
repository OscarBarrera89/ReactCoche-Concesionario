import { Button, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { apiUrl } from "../config";

/**
 * Componente para buscar un coche por matrícula.
 * @returns {JSX.Element} El componente de búsqueda de coche.
 */
function BusquedaCoche(){
    const [cocheM, setCocheM] = useState({
      matricula: "",
    });
    const [errorMatricula, setErrorMatricula] = useState(false);
    const navigate = useNavigate();

    /**
     * Maneja el envío del formulario para buscar un coche.
     * @param {Event} e - El evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch(apiUrl +  "/coche/matricula/" + cocheM.matricula, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
          
          if (response.ok) {
            const respuesta = await response.json();
            alert(respuesta.mensaje);
            if (respuesta.ok) {
              navigate("/MatriculaEncontrada", { state: { coche: respuesta.datos } });
            }
          } else {
            const errorText = await response.text();
            console.error("Error en la respuesta:", errorText);
            alert("Error al buscar el coche");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Error al conectar con el servidor");
        }
      };

    /**
     * Maneja los cambios en los campos del formulario.
     * @param {Event} e - El evento de cambio del campo.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "matricula") {
          const exRegMatricula = /^[0-9]{4}[A-Z]{3}$/i; 
          setErrorMatricula(!exRegMatricula.test(value));
        }
      
        setCocheM((prevCoche) => ({
          ...prevCoche,
          [name]: value,
        }));
      };

    return(
        <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Busqueda de coche por Matrícula
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
            <TextField
              label="Matrícula"
              name="matricula"
              value={cocheM.matricula}
              onChange={handleChange}
              error={errorMatricula}
              helperText={errorMatricula ? "Formato inválido (ej: 1234ABC)" : ""}
            />
            <Button variant="contained" type="submit">
             <ScreenSearchDesktopIcon />
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
    );
}

export default BusquedaCoche;