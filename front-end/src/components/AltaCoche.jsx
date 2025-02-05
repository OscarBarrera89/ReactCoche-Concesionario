import {
  Typography,
  TextField,
  Stack,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AltaCoche() {
  const [coche, setCoche] = useState({
    id_coche: null,
    id_concesionario: "",
    matricula: "",
    modelo: "",
    precio: 0.00,
    disponible: false,
    fecha_registro: new Date().toISOString(),
  });
  const [concesionarios, setConcesionarios] = useState([]);
  const navigate = useNavigate();
  const [errorMatricula, setErrorMatricula] = useState(false);
  const [errorPrecio, setErrorPrecio] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const cocheConFecha = {
      ...coche,
      fecha_registro: formatoFecha(new Date()),
    };
  
    console.log("Enviando JSON:", JSON.stringify(cocheConFecha, null, 2));
  
    try {
      const response = await fetch("http://localhost:3000/api/coche", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(cocheConFecha),
      });
  
      if (response.ok) {
        const respuesta = await response.json();
        alert(respuesta.mensaje);
        if (respuesta.ok) {
          navigate("/");
        }
      } else {
        const errorText = await response.text(); // Obtener mensaje detallado del backend
        console.error("Error en la respuesta:", errorText);
        alert("Error al registrar el coche");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };
  
  const formatoFecha = (fecha) => {
    console.log(fecha);
    const ano = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); 
    const dia = String(fecha.getDate()).padStart(2, "0"); 
    return `${dia}-${mes}-${ano}`;
  };
  

const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === "matricula") {
    const regexMatricula = /^[0-9]{4}[A-Z]{3}$/i; 
    setErrorMatricula(!regexMatricula.test(value));
  }

  if(name === "precio") {
    setErrorPrecio(value <= 0);
  }

  setCoche((prevCoche) => ({
    ...prevCoche,
    [name]: value,
  }));
};

  
  

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de coches
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
            <Select
              name="id_concesionario"
              id="id_concesionario"
              value={coche.id_concesionario}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecciona un concesionario
              </MenuItem>
              {concesionarios.map((c) => (
                <MenuItem key={c.id_concesionario} value={c.id_concesionario}>
                  {c.nombre}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Matrícula"
              name="matricula"
              value={coche.matricula}
              onChange={handleChange}
              error={errorMatricula}
              helperText={errorMatricula ? "Formato inválido (ej: 1234ABC)" : ""}
            />
            <TextField
              label="Modelo"
              type="text"
              name="modelo"
              value={coche.modelo}
              onChange={handleChange}
            />
            <TextField
              type="number"
              label="Precio"
              name="precio"
              error={errorPrecio}
              helperText={errorPrecio ? "Tiene que ser mayor a 0 el valor" : ""}
              value={coche.precio}
              onChange={handleChange}//(e, value) => setDatos({ ...datos, precio: value })
            />
            <Select name="disponible" value={coche.disponible} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>
                Selecciona un estado
              </MenuItem>
              <MenuItem value={true}>Disponible</MenuItem>
              <MenuItem value={false}>No disponible</MenuItem>
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

export default AltaCoche;
