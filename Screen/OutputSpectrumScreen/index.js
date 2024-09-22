import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import styles from "./styles.js";

export default function OutputSpectrumScreen({ navigation }) {
  useEffect(() => {
    console.log(
      "Entrando na Tela para apresentação dos gráficos do espectro do sinal de saída"
    );
    return () => {
      console.log(
        "Finalizando tela: Tela para apresentação dos gráficos do espectro do sinal de saída"
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Você está na Tela para apresentação dos gráficos do espectro do sinal de
        saída!
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
