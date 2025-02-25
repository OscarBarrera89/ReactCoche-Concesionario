import { Image } from '@/components/ui/image';
import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
      source={{
        uri: "https://i.imgur.com/bZBQ1cv.jpeg",
      }}
      alt="Logo"
      size="none"
      className="aspect-[320/208] w-full max-w-[320px]"
      />
      <Text>Aplicacion para gestionar Coches y Concesionarios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});