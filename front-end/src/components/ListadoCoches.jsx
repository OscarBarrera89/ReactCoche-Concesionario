import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import generatePDF from "../utils/generatePDF";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Estilos del PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "16%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: { width: "16%", borderStyle: "solid", borderWidth: 1, padding: 5 },
});

// Componente del documento PDF
const ListadoCochesPDF = ({ coches, concesionarios}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Listado de coches</Text>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>ID</Text>
          <Text style={styles.tableColHeader}>CONCESIONARIO</Text>
          <Text style={styles.tableColHeader}>MATRICULA</Text>
          <Text style={styles.tableColHeader}>MODELO</Text>
          <Text style={styles.tableColHeader}>PRECIO</Text>
          <Text style={styles.tableColHeader}>DISPONIBLE</Text>
          <Text style={styles.tableColHeader}>FECHA-REGISTRO</Text>
        </View>
        {/* Filas de datos */}
        {coches.map((coche) => (
          <View style={styles.tableRow} key={coche.id_coche}>
            <Text style={styles.tableCol}>{coche.id_coche}</Text>
            <Text style={styles.tableCol}>{concesionarios.map((concesionario) => (
              concesionario.id_concesionario === coche.id_concesionario ? concesionario.nombre : "" ))}</Text>
            <Text style={styles.tableCol}>{coche.matricula}</Text>
            <Text style={styles.tableCol}>{coche.modelo}</Text>
            <Text style={styles.tableCol}>{coche.precio + " €"}</Text>
            <Text style={styles.tableCol}>{coche.disponible == true ? "Disponible" : "No disponible"}</Text>
            <Text style={styles.tableCol}>{coche.fecha_registro}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

/**
 * Componente principal que muestra el listado de coches.
 * @returns {JSX.Element} El componente ListadoCoches.
 */
function ListadoCoches() {
  const [coches, setCoches] = useState([]);
  const [concesionarios, setConcesionarios] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [cochesPorPagina] = useState(5);
  const navigate = useNavigate();
  
  // Calcular el índice del último coche en la página actual
  const ultimoCoche = pagina * cochesPorPagina;
  // Calcular el índice del primer coche en la página actual
  const primerCoche = ultimoCoche - cochesPorPagina;
  // Obtener los coches que se mostrarán en la página actual
  const cochesMostrados = coches.slice(primerCoche, ultimoCoche);

  // Obtener la lista de coches desde la API
  useEffect(() => {
    async function getCoches() {
      let response = await fetch(apiUrl +  "/coche", {
        method: "GET",
      });
      if (response.ok) {
        let data = await response.json();
        setCoches(data.datos);
      }
    }
    getCoches();
  }, []);
  
  // Obtener la lista de concesionarios desde la API
  useEffect(() => {
    async function getConcesionarios() {
      let response = await fetch(apiUrl +  "/concesionario", {
        method: "GET"
      });
      if (response.ok) {
        let data = await response.json();
        setConcesionarios(data.datos);
      }
    }
    getConcesionarios();
  }, []);

  /**
   * Manejar la eliminación de un coche.
   * @param {number} id_coche - El ID del coche a eliminar.
   */
  const handleDelete = async (id_coche) => {
    let response = await fetch(apiUrl +  "/coche/" + id_coche, {
      method: "DELETE",
    });
    if (response.ok) {
      const cocheTrasBorrado = coches.filter(coche => coche.id_coche !== id_coche);
      setCoches(cocheTrasBorrado);
    }
  };
  
  /**
   * Manejar el cambio de página en la paginación.
   * @param {object} event - El evento de cambio de página.
   * @param {number} value - El número de la nueva página.
   */
  const handlePageChange = (event, value) => {
    setPagina(value);
  };

  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 4 }} mx={4}>
        <TableContainer component={Paper} sx={{ mt: 2 }} id="pdf-listado">
        <Typography variant="h4" align="center" sx={{ mt: 2 , mb: 4}}>
          Listado de coches
        </Typography>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">IDCoche</TableCell>
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
              {cochesMostrados.map((coche) => (
                <TableRow key={coche.id_coche} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center">{coche.id_coche}</TableCell>
                  <TableCell>{concesionarios.map((concesionario) => (
                    concesionario.id_concesionario === coche.id_concesionario ? concesionario.nombre : ""
                  ))}</TableCell>
                  <TableCell>{coche.matricula}</TableCell>
                  <TableCell>{coche.modelo}</TableCell>
                  <TableCell>{coche.precio + " €"}</TableCell>
                  <TableCell>{coche.disponible ? "Disponible" : "No disponible"}</TableCell>
                  <TableCell>{coche.fecha_registro}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => navigate("/modificarCoche/" + coche.id_coche)}>
                      <EditIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDelete(coche.id_coche)} color="error">
                      <DeleteOutlineIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(coches.length / cochesPorPagina)}
          page={pagina}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        />  
      </Grid>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={() => window.print()}>
          Imprimir listado (navegador)
        </Button>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained">
          <PDFDownloadLink
            document={<ListadoCochesPDF coches={coches} concesionarios={concesionarios} />}
            fileName="tablaCoches.pdf"
            style={{ color: "white", textDecoration: "none" }}
          >
            {({ loading }) =>
              loading ? "Generando PDF..." : "Imprimir listado (react-pdf)"
            }
          </PDFDownloadLink>
        </Button>
      </Box>
    </>
  );
}

export default ListadoCoches;
