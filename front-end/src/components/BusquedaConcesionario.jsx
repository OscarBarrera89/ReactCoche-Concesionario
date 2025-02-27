import { Button, Grid2, Stack, TextField, Typography } from "@mui/material";
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { useNavigate } from "react-router";
import { useState } from "react";
import { apiUrl } from "../config";

/**
 * Componente para buscar un concesionario por nombre.
 * @returns {JSX.Element} El componente de búsqueda de concesionario.
 */
function BusquedaConcesionario(){
    const [concesionarioN, setConcesionarioN] = useState({
        nombre: "",
      });
    const navigate = useNavigate();

    /**
     * Maneja el envío del formulario para buscar un concesionario.
     * @param {Event} e - El evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(
                apiUrl +  "/concesionario/nombre/" + concesionarioN.nombre,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
    
            if (response.ok) {
                const respuesta = await response.json();
                alert(respuesta.mensaje);
                if (respuesta.ok) {
                    navigate("/ConcesionarioEncontrado", { state: { concesionario: respuesta.datos } });
                }
            } else {
                alert("Error al buscar el concesionario");
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
      
        setConcesionarioN((concesionario) => ({
          ...concesionario,
          [name]: value,
        }));
      };

    return(
      <>
        <Typography variant="h4" align="center" sx={{ mt: 2 }}>
          Busqueda de concesionario por nombre
        </Typography>
        <Grid2
          container
          spacing={2}
          sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
              <TextField
                label="Nombre"
                name="nombre"
                value={concesionarioN.nombre}
                onChange={handleChange}
                helperText="Introduzca el nombre del concesionario (ej: Sevilla Cars)"
              />
              <Button variant="contained" type="submit">
               <ScreenSearchDesktopIcon />
              </Button>
            </Stack>
          </Grid2>
        </Grid2>
      </>
    );
}

export default BusquedaConcesionario;