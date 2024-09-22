import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import styles from "./styles.js";

export default function DataImputScreen({ navigation }) {
  useEffect(() => {
    console.log(
      "Entrando na Tela de entrada de dados para efetuar os cálculos"
    );
    return () => {
      console.log(
        "Finalizando tela: Tela de entrada de dados para efetuar os cálculos"
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Você está na Tela de entrada de dados para efetur os cálculos!
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
