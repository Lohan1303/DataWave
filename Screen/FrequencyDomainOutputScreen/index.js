import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import styles from "./styles.js";
import { DataContext } from "../../context/DataContext.js";
import { LineChart } from "react-native-chart-kit";

export default function FrequencyDomainOutputScreen({ navigation }) {
  const [coordX, setCoordX] = useState([]); // Coordinate X values
  const [coordY, setCoordY] = useState([]); // Coordinate Y values

  const {
    x_input,
    y_input,
    x_response,
    y_response,
    x_output,
    y_output,
    setX_Output,
    setY_Output,
  } = useContext(DataContext);

  const modulo_espectro_saida = (x_input, y_input, x_response, y_response) => {
    let x_output = x_input;
    let y_output = [];
    for (i = 0; i < x_output.length; i++) {
      let index_valor_procurado = x_response.indexOf(x_input[i]);
      y_output.push(y_input[i] * y_response[index_valor_procurado]);
    }
    y_output = y_output.map((item) => (isNaN(item) ? "" : item));
    return [x_output, y_output];
  };

  const fase_espectro_saida = (x_input, y_input, x_response, y_response) => {
    let x_output = x_input;
    let y_output = [];
    for (i = 0; i < x_output.length; i++) {
      let index_valor_procurado = x_response.indexOf(x_input[i]);
      y_output.push(y_input[i] + y_response[index_valor_procurado]);
    }
    y_output = y_output.map((item) => (isNaN(item) ? "" : item));
    return [x_output, y_output];
  };

  const gerar_grafico_modulo = (x_input, y_input, x_response, y_response) => {
    const [x_output, y_output] = modulo_espectro_saida(
      x_input,
      y_input,
      x_response,
      y_response
    );
    setCoordX(x_output);
    setCoordY(y_output);
  };

  const gerar_grafico_fase = (x_input, y_input, x_response, y_response) => {
    const [x_output, y_output] = fase_espectro_saida(
      x_input,
      y_input,
      x_response,
      y_response
    );
    setCoordX(x_output);
    setCoordY(y_output);
  };

  useEffect(() => {
    console.log(x_input);
    console.log(y_input);
    console.log(x_response);
    console.log(y_response);
    console.log(coordX);
    console.log(coordY);
    gerar_grafico_modulo(x_input, y_input, x_response, y_response);
    //gerar_grafico_fase();

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
      {coordX.length > 0 && coordY.length > 0 && (
        <View>
          <LineChart
            data={{
              labels: coordX,
              datasets: [
                {
                  data: coordY,
                },
              ],
            }}
            width={700} // Ajusta para largura da tela
            height={300}
            withVerticalLabels={true} // Exibe rótulos verticais
            withShadow={true}
            withInnerLines={false}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
            }}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
