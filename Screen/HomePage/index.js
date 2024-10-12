import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import styles from "./styles.js";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function HomePage({ navigation }) {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    return () => {
      console.log("Finalizando tela: HomePage");
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem Vindo ao DataWave!</Text>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("DataInputScreen")}
      >
        <Text style={styles.texto}>Bora sufar nessa onda</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
