import { StatusBar } from "expo-status-bar";
import { Text, View, Alert } from "react-native";
import { useContext, useEffect, useCallback } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";
import { DataContext } from "../../context/DataContext.js";
import { useFocusEffect } from "@react-navigation/native";

export default function FrequencyResponseScreen({ navigation }) {
  const [modulo_coordX, setModulo_CoordX] = useState([]); // coordenada de X
  const [modulo_coordY, setModulo_CoordY] = useState([]); // coordenada de Y
  const [fase_coordX, setFase_CoordX] = useState([]); // coordenada de X
  const [fase_coordY, setFase_CoordY] = useState([]); // coordenada de Y
  const [passo, setPasso] = useState(0.1); // distância entre as coordenadas de X
  const [freqFinal, setFreqFinal] = useState(50); // frequência final que aparece no gráfico

  const {
    setModulo_X_Response,
    setModulo_Y_Response,
    setFase_X_Response,
    setFase_Y_Response,
    frequenciaCorte,
    tipoOnda,
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
    if (frequenciaCorte && tipoOnda) {
      gerar_grafico_fase();
      gerar_grafico_modulo();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
      Alert.alert(
        "Aviso",
        "Por favor, preencha o tipo de onda e a frequência corte."
      );
    }
  }, [frequenciaCorte, tipoOnda]);

  /* Função para retornar o módulo da resposta em frequência de um canal */
  const modulo_resposta_em_frequencia = (f, f_c) => {
    const H = f.map((fi) => 1 / Math.sqrt(1 + (fi / f_c) ** 2));
    return H;
  };

  /* Função para retornar a fase da resposta em frequência de um canal */
  const fase_resposta_em_frequencia = (f, f_c) => {
    return f.map((fi) => Math.atan(-fi / f_c));
  };

  /* Função para gerar os valores de x(frequência) do gráfico */
  const gerar_frequencias = (final, passo) => {
    const valores = [];
    for (let i = 0; i < final / passo; i++) {
      valores.push(passo * i);
    }
    return valores;
  };

  /* Função para gerar o gráfico do módulo da resposta em frequência na tela */
  const gerar_grafico_modulo = () => {
    const valores_x = gerar_frequencias(freqFinal, passo); // Alterado passo para 0.5 para simplificar visualização
    const valores_y = modulo_resposta_em_frequencia(valores_x, frequenciaCorte);

    // Ajustando a quantidade de rótulos no eixo X para visualização
    const labels = valores_x.map((val, index) =>
      index % freqFinal === 0 ? val.toFixed(1) : ""
    );

    setModulo_CoordX(labels); // Define os rótulos filtrados no eixo X
    setModulo_CoordY(valores_y); // Define os valores da função de módulo no eixo Y

    setModulo_X_Response(valores_x);
    setModulo_Y_Response(valores_y);
  };

  /* Função para gerar o gráfico da fase da resposta em frequência na tela */
  const gerar_grafico_fase = () => {
    const valores_x = gerar_frequencias(freqFinal, passo); // Alterado passo para 0.5 para simplificar visualização
    const valores_y_radiano = fase_resposta_em_frequencia(
      valores_x,
      frequenciaCorte
    );

    const valores_y_grau = valores_y_radiano.map(
      (val) => val * (180 / Math.PI)
    );

    // Ajustando a quantidade de rótulos no eixo X para visualização
    const labels = valores_x.map((val, index) =>
      index % freqFinal === 0 ? val.toFixed(1) : ""
    );

    setFase_CoordX(labels); // Define os rótulos filtrados no eixo X
    setFase_CoordY(valores_y_grau); // Define os valores da função de módulo no eixo Y

    setFase_X_Response(valores_x);
    setFase_Y_Response(valores_y_grau);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {modulo_coordX.length > 0 && modulo_coordY.length > 0 && (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.chartTitle}>Modulo</Text>
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
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.chartTitle}>Fase</Text>
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
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
