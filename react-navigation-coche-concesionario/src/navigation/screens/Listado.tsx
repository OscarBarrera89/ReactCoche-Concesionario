import { StyleSheet, View } from 'react-native';
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { Icon, ArrowRightIcon } from "@/components/ui/icon";
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

  const [coches, setCoches] = useState<Coche[]>([]);

  useEffect(() => {
    async function getCoches() {
      let response = await fetch("http://localhost:3000/api/coche", {
        method: "GET",
        credentials: "include"
      });
      if (response.ok) {
        let data = await response.json();
        setCoches(data.datos);
      }
    }
    getCoches();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
      {coches.map((coche) => (
      <Card key={coche.id_coche} className="p-5 rounded-lg max-w-[360px] m-3">
        <Heading size="md" className="mb-4">
          {coche.modelo}
        </Heading>
        <Heading size="sm" className="mb-4">
          {coche.id_concesionario}
        </Heading>
    <Text
      className="text-sm font-normal mb-2 text-typography-700"
    >
      {coche.matricula}
    </Text>
    <Link href="https://gluestack.io/" isExternal>
      <HStack className="items-center">
        <LinkText
          size="sm"
          className="font-semibold text-info-600 no-underline"
        >
          Read Blog
        </LinkText>
        <Icon
          as={ArrowRightIcon}
          size="sm"
          className="text-info-600 mt-0.5 ml-0.5"
        />
      </HStack>
    </Link>
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