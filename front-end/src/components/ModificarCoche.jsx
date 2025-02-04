import { Typography, TextField, Stack, Button, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function ModificarCoche() {
  const params = useParams();
  const navigate = useNavigate();
  const [coche, setCoche] = useState({
    id_coche: params.id,
    id_concesionario: "",
    matricula: "",
    modelo: "",
    precio: 0.00,
    disponible: false,
    fecha_registro: new Date(),
  });
  const [concesionarios, setConcesionarios] = useState([]);
  const [errorMatricula, setErrorMatricula] = useState(false);

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

  useEffect(() => {
    async function getCoche() {
      let response = await fetch("http://localhost:3000/api/coche/"+ coche.id_coche);
      if (response.ok) {
        let data = await response.json();
        setCoche(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/");
      }
    }

    getCoche();
  }, [coche.id_coche, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/api/coche/"+ coche.id_coche, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(coche), 
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
    
    if (name === "matricula") {
      const regexMatricula = /^[0-9]{4}[A-Z]{3}$/i; 
      setErrorMatricula(!regexMatricula.test(value));
    }
  
    setCoche((prevCoche) => ({
      ...prevCoche,
      [name]: value,
    }));
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar Coche
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
              Aceptar Modificacion
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarCoche;
