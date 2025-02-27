import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { apiUrl } from "../config";
import generatePDF from "../utils/generatePDF.js";

/**
 * Componente para mostrar una gráfica de precios de coches.
 * @returns {JSX.Element} El componente de gráfica de coches.
 */
function GraficaCoches() {
  const [datos, setDatos] = useState([]);

  const COLORS = "#0088FE";

  // Obtener los datos de la gráfica al cargar el componente
  useEffect(() => {
    async function getDatosGraficaCoches() {
      try {
        const response = await fetch(`${apiUrl}/coche/grafica`, { method: "GET" });

        if (response.ok) {
          const data = await response.json();

          const datosGrafica = data.datos.map((coche) => ({
            nombre: coche.matricula,
            precio: parseFloat(coche.precio),
          }));

          setDatos(datosGrafica);
        } else {
          console.error("Error al obtener los datos de la API");
        }
      } catch (err) {
        console.error("Error al recuperar precios:", err);
      }
    }

    getDatosGraficaCoches();
  }, []);

  return (
    <>
      <Box id="pdf-content" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
        <Typography variant="h4" align="center">
          Precios de todos los coches
        </Typography>

        {datos.length ? (
          <Box sx={{ width: "80%", height: 400, mt: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="precio" fill={COLORS} name="Precio" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Typography align="center" sx={{ mt: 4 }}>
            No hay datos para mostrar.
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" onClick={generatePDF}>
          Descargar PDF
        </Button>
      </Box>
    </>
  );
}

export default GraficaCoches;