import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import styles from "./styles.js";

export default function TimeDomainInputScreen({ navigation }) {
  useEffect(() => {
    console.log(
      "Entrando na Tela para apresentação do gráfico do sinal de entrada no domínio do tempo"
    );
    return () => {
      console.log(
        "Finalizando tela: Tela para apresentação do gráfico do sinal de entrada no domínio do tempo"
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Você está na Tela do gráfico do sinal de entrada no domínio do tempo!
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
