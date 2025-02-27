import { StyleSheet, View } from 'react-native';
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { TrashIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export function ListadoScreen() {

  interface Coche {
    id_coche: number;
    id_concesionario: number;
    matricula: string;
    modelo: string;
    precio: number;
    disponible: boolean;
    fecha_registro: string;
  }

  interface Concesionario {
    id_concesionario: number;
    nombre: string;
    direccion: string;
    fecha_fundacion: number;
    activo: boolean;
  }
  const [concesionarios, setConcesionarios] = useState<Concesionario[]>([]);
  const [coches, setCoches] = useState<Coche[]>([]);

  useEffect(() => {
    async function getCoches() {
      let response = await fetch("http://localhost:3000/api/coche", {
        method: "GET"
      });
      if (response.ok) {
        let data = await response.json();
        setCoches(data.datos);
      }
    }
    getCoches();
  }, []);

          useEffect(() => {
            async function getConcesionarios() {
              let response = await fetch( "http://localhost:3000/api/concesionario", {method: "GET"});
        
              if (response.ok) {
                let data = await response.json();
                setConcesionarios(data.datos);
              }
            }
        
            getConcesionarios();
          }, []);

        const handleDelete = async (id_coche: number) => {
          const response = await fetch("http://localhost:3000/api/coche/" + id_coche, {
            method: "DELETE",
          });
          if (response.ok) {
            const cocheTrasBorrado = coches.filter(coche => coche.id_coche !== id_coche);
            setCoches(cocheTrasBorrado);
          }
        }

  return (
    <View style={styles.container}>
      <ScrollView>
      {coches.map((coche) => (
      <Card key={coche.id_coche} className="p-5 rounded-lg max-w-[360px] m-3">
        <Heading size="md" className="mb-4">
          {coche.modelo}
        </Heading>
        <Heading size="sm" className="mb-4">
          {concesionarios.find((concesionario) => concesionario.id_concesionario === coche.id_concesionario)?.nombre}
        </Heading>
    <Text
      className="text-sm font-normal mb-2 text-typography-700"
    >
      {coche.matricula}
    </Text>
    <Button variant="outline" size="sm" onPress={() => handleDelete(coche.id_coche)}>
        <TrashIcon className="w-5 h-5" />
    </Button>
  </Card>
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});