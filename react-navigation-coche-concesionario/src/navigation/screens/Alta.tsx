import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function AltaScreen() {
  return (
    <View style={styles.container}>
      <Text>Alta Screen</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
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
