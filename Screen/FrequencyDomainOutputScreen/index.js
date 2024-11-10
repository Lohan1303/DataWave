import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import styles from "./styles.js";

export default function OutputSpectrumScreen({ navigation }) {
  const [coordX, setCoordX] = useState([]); // Coordinate X values
  const [coordY, setCoordY] = useState([]); // Coordinate Y values

  const modulo_espectro_saida = (x_input, y_input, x_responde, y_response) => {
    let x_output = x_input;
    let y_output = [];
    for (i = 0; i < x_output.length; i++) {
      let index_valor_procurado = x_responde.indexOf(x_input[i]);
      y_output.push(y_input[i] * y_response[index_valor_procurado]);
    }
    return y_output;
  };

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
