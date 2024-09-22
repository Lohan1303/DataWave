import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import styles from "./styles.js";

export default function FrequencyDomainInputScreen({ navigation }) {
  useEffect(() => {
    console.log(
      "Entrando na Tela para apresentação do gráfico do espectro do sinal de entrada (amplitude e fase de cada componente senoidal)"
    );
    return () => {
      console.log(
        "Finalizando tela: Tela para apresentação do gráfico do espectro do sinal de entrada (amplitude e fase de cada componente senoidal)"
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Você está na Tela de apresentação do gráfico do espectro do sinal de
        entrada no domínio da frequência!
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
