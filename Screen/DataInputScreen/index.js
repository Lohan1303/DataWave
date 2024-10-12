import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./styles.js";

export default function DataImputScreen({ navigation }) {
  useEffect(() => {

    // Trava a orientação em modo paisagem
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    console.log(
      "Entrando na Tela de entrada de dados para efetuar os cálculos"
    );
    return () => {
      console.log(
        "Finalizando tela: Tela de entrada de dados para efetuar os cálculos"
      );
      // Destrava a orientação ao sair da tela
      ScreenOrientation.unlockAsync();
      
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Você está na Tela de entrada de dados para efetuar os cálculos!
      </Text>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text style={styles.texto}>Voltar para a Home</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
