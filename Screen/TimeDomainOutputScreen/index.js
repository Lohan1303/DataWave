import { StatusBar } from "expo-status-bar";
import { Text, View, Alert } from "react-native";
import { useContext, useEffect, useCallback } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { DataContext } from "../../context/DataContext.js";

export default function TimeDomaOutputScreen({ navigation }) {
  const {
    modulo_x_output,
    modulo_y_output,
    fase_x_output,
    fase_y_output,
    frequenciaFundamental,
    tipoOnda,
  } = useContext(DataContext);
  const [coordX, setCoordX] = useState([]);
  const [coordY, setCoordY] = useState([]);
  const [passo, setPasso] = useState(1);

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
      !modulo_x_output.length ||
      !modulo_y_output.length ||
      !fase_y_output.length ||
      !frequenciaFundamental ||
      !tipoOnda
    ) {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
      Alert.alert(
        "Aviso",
        "Por favor, passe pelos demais gráficos antes para gerar os dados."
      );
    } else {
      console.log("@@tipoonda", tipoOnda);
      switch (tipoOnda) {
        case "Quadrada":
          geraOndaQuadrada(modulo_x_output, modulo_y_output);
          break;
        case "Dente de Serra":
          geraOndaDenteSerra(modulo_x_output, modulo_y_output, fase_y_output);
          break;
        case "Triangular":
          console.log("Tipo de onda não reconhecido.");
          break;
        case "Senoide Retificada":
          console.log("Tipo de onda não reconhecido.");
          break;
        default:
          console.log("Tipo de onda não reconhecido.");
      }
    }
  }, []);

  const geraOndaQuadrada = (modulo_x_output, modulo_y_output) => {
    try {
      console.log("quadrada");
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
      console.log("dentedeserra");
      const novasCoordX = [];
      const novasCoordY = [];
      const periodo = 1 / frequenciaFundamental;

      fase_y_output = fase_y_output.map((item) => item * (Math.PI / 180));

      for (let t = -2; t <= 2; t += 0.01) {
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

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
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
              width={700}
              height={300}
              chartConfig={{
                backgroundColor: "#1f1f1f",
                backgroundGradientFrom: "#2d2d2d",
                backgroundGradientTo: "#2d2d2d",
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
        )}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
