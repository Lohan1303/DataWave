import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useContext, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";
import { DataContext } from "../../context/DataContext.js";

export default function TimeDomaOutputScreen({ navigation }) {
  const {
    modulo_x_output,
    modulo_y_output,
    fase_x_output,
    fase_y_output,
    frequenciaFundamental,
  } = useContext(DataContext);
  const [coordX, setCoordX] = useState([]);
  const [coordY, setCoordY] = useState([]);
  const [passo, setPasso] = useState(1);

  const geraOndaQuadrada = (modulo_x_output, modulo_y_output) => {
    try {
      const novasCoordX = [];
      const novasCoordY = [];
      const periodo = 1 / frequenciaFundamental;

      for (let t = 1; t < modulo_x_output.length; t += 2) {
        const coordY = Math.sign(
          coordY +
            modulo_y_output[t - 1] *
              Math.cos(2 * Math.PI * frequenciaFundamental * t)
        );

        novasCoordY.push(coordY);
        novasCoordX.push(
          Math.abs(t).toFixed(100) % periodo < passo ? t.toFixed(3) : ""
        );
      }

      setCoordY(novasCoordY);
      setCoordX(novasCoordX);
    } catch (e) {
      console.log("Erro:", e);
    }
  };

  const geraOndaDenteSerra = (
    modulo_x_output,
    modulo_y_output,
    fase_y_output
  ) => {
    try {
      const novasCoordX = [];
      const novasCoordY = [];
      const periodo = 1 / frequenciaFundamental;

      fase_y_output = fase_y_output.map((item) => item * (Math.PI / 180));

      for (let t = 0; t <= 50; t += 0.5) {
        let somaHarmonicas = 0;

        for (let n = 1; n <= modulo_x_output.length; n++) {
          somaHarmonicas +=
            modulo_y_output[n - 1] *
            Math.cos(
              2 * Math.PI * n * frequenciaFundamental * t + fase_y_output[n - 1]
            );
        }

        novasCoordY.push(somaHarmonicas);
        novasCoordX.push(
          Math.abs(t).toFixed(100) % periodo < passo ? t.toFixed(3) : ""
        );
      }
      console.log(novasCoordY);
      console.log(novasCoordX);

      // Atualizar os estados de coordY e coordX após o loop
      setCoordY(novasCoordY);
      setCoordX(novasCoordX);
    } catch (e) {
      console.log("Erro:", e);
    }
  };

  useEffect(() => {
    geraOndaDenteSerra(modulo_x_output, modulo_y_output, fase_y_output);
    console.log(
      "Entrando na Tela para apresentação do sinal de saída no domínio do tempo"
    );
    return () => {
      console.log(
        "Finalizando tela: Tela para apresentação do sinal de saída no domínio do tempo"
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
                  withDots: true,
                  lineColor: "transparent",
                },
              ],
            }}
            width={800}
            height={300}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{ marginVertical: 8 }}
            withVerticalLabels
            withShadow
            withInnerLines
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            xLabelsOffset={-5}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
