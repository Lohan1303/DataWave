import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import { DataContext } from "../../context/DataContext.js";
import { LineChart } from "react-native-chart-kit";

export default function FrequencyDomainOutputScreen({ navigation }) {
  const [modulo_coordX, setModulo_CoordX] = useState([]); // Coordinate X values
  const [modulo_coordY, setModulo_CoordY] = useState([]); // Coordinate Y values
  const [fase_coordX, setFase_CoordX] = useState([]); // Coordinate X values
  const [fase_coordY, setFase_CoordY] = useState([]); // Coordinate Y values

  const {
    modulo_x_input,
    modulo_y_input,
    fase_x_input,
    fase_y_input,
    modulo_x_response,
    modulo_y_response,
    fase_x_response,
    fase_y_response,
    setModulo_X_Output,
    setModulo_Y_Output,
    setFase_X_Output,
    setFase_Y_Output,
  } = useContext(DataContext);

  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
          );
        } catch (error) {
          console.error("Erro ao bloquear a orientação:", error);
        }
      };
      lockOrientation();
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  useEffect(() => {
    if (
      !modulo_x_input.length ||
      !modulo_y_input.length ||
      !modulo_x_response.length ||
      !modulo_y_response.length ||
      !fase_x_input.length ||
      !fase_y_input.length ||
      !fase_x_response.length ||
      !fase_y_response.length
    ) {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
      Alert.alert(
        "Aviso",
        "Por favor, passe pelo Frequency Domain input chart antes."
      );
    } else {
      gerar_grafico_modulo(
        modulo_x_input,
        modulo_y_input,
        modulo_x_response,
        modulo_y_response
      );
      gerar_grafico_fase(
        fase_x_input,
        fase_y_input,
        fase_x_response,
        fase_y_response
      );
    }
  }, []);

  const modulo_espectro_saida = (
    modulo_x_input,
    modulo_y_input,
    modulo_x_response,
    modulo_y_response
  ) => {
    let x_output = modulo_x_input;
    let y_output = [];
    for (i = 0; i < x_output.length; i++) {
      let index_valor_procurado = modulo_x_response.indexOf(modulo_x_input[i]);
      y_output.push(
        modulo_y_input[i] * modulo_y_response[index_valor_procurado]
      );
    }

    y_output = y_output.map((item) => (isNaN(item) ? "" : item));
    return [x_output, y_output];
  };

  const fase_espectro_saida = (
    fase_x_input,
    fase_y_input,
    fase_x_response,
    fase_y_response
  ) => {
    let x_output = fase_x_input;
    let y_output = [];
    for (i = 0; i < x_output.length; i++) {
      let index_valor_procurado = fase_x_response.indexOf(fase_x_input[i]);
      y_output.push(fase_y_input[i] + fase_y_response[index_valor_procurado]);
    }
    y_output = y_output.map((item) => (isNaN(item) ? "" : item));
    return [x_output, y_output];
  };

  const gerar_grafico_modulo = (
    modulo_x_input,
    modulo_y_input,
    modulo_x_response,
    modulo_y_response
  ) => {
    const [x_output, y_output] = modulo_espectro_saida(
      modulo_x_input,
      modulo_y_input,
      modulo_x_response,
      modulo_y_response
    );
    setModulo_CoordX(x_output);
    setModulo_CoordY(y_output);

    setModulo_X_Output(x_output);
    setModulo_Y_Output(y_output);
  };

  const gerar_grafico_fase = (
    fase_x_input,
    fase_y_input,
    fase_x_response,
    fase_y_response
  ) => {
    const [x_output, y_output] = fase_espectro_saida(
      fase_x_input,
      fase_y_input,
      fase_x_response,
      fase_y_response
    );
    setFase_CoordX(x_output);
    setFase_CoordY(y_output);

    setFase_X_Output(x_output);
    setFase_Y_Output(y_output);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {modulo_coordX.length > 0 && modulo_coordY.length > 0 && (
          <View>
            <View>
              <Text style={styles.chartTitle}>opa</Text>
              <LineChart
                data={{
                  labels: modulo_coordX,
                  datasets: [
                    {
                      data: modulo_coordY,
                    },
                  ],
                }}
                width={700}
                height={300}
                chartConfig={{
                  backgroundColor: "#1f1f1f",
                  backgroundGradientFrom: "#2d2d2d",
                  backgroundGradientTo: "#2d2d2d",
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    marginLeft: 20,
                    marginRight: 20,
                  },
                }}
                style={styles.chart}
                withVerticalLabels
                withShadow
                withInnerLines
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                xLabelsOffset={-5}
              />
            </View>
            <View>
              <Text style={styles.chartTitle}>opa</Text>
              <LineChart
                data={{
                  labels: fase_coordX,
                  datasets: [
                    {
                      data: fase_coordY,
                    },
                  ],
                }}
                width={700}
                height={300}
                chartConfig={{
                  backgroundColor: "#1f1f1f",
                  backgroundGradientFrom: "#2d2d2d",
                  backgroundGradientTo: "#2d2d2d",
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    marginLeft: 20, // Ajustando as margens
                    marginRight: 20,
                  },
                }}
                style={styles.chart}
                withVerticalLabels
                withShadow
                withInnerLines
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                xLabelsOffset={-5}
              />
            </View>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
