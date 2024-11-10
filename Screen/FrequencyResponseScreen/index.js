import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function FrequencyResponseScreen({ navigation }) {
  const [coordX, setCoordX] = useState([]); // coordenada de X
  const [coordY, setCoordY] = useState([]); // coordenada de Y
  const [freqCorte, setFreqCorte] = useState(2); // frequência de corte
  const [passo, setPasso] = useState(0.1); // distância entre as coordenadas de X
  const [freqFinal, setFreqFinal] = useState(50); // frequência final que aparece no gráfico

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
    const valores_y = modulo_resposta_em_frequencia(valores_x, freqCorte);

    // Ajustando a quantidade de rótulos no eixo X para visualização
    const labels = valores_x.map((val, index) =>
      index % freqFinal === 0 ? val.toFixed(1) : ""
    );

    setCoordX(labels); // Define os rótulos filtrados no eixo X
    setCoordY(valores_y); // Define os valores da função de módulo no eixo Y
  };

  /* Função para gerar o gráfico da fase da resposta em frequência na tela */
  const gerar_grafico_fase = () => {
    const valores_x = gerar_frequencias(freqFinal, passo); // Alterado passo para 0.5 para simplificar visualização
    const valores_y_radiano = fase_resposta_em_frequencia(valores_x, freqCorte);

    const valores_y_grau = valores_y_radiano.map(
      (val) => val * (180 / Math.PI)
    );

    console.log(valores_y_radiano[1]);
    // Ajustando a quantidade de rótulos no eixo X para visualização
    const labels = valores_x.map((val, index) =>
      index % freqFinal === 100 ? val.toFixed(1) : ""
    );

    setCoordX(labels); // Define os rótulos filtrados no eixo X
    setCoordY(valores_y_grau); // Define os valores da função de módulo no eixo Y
  };

  useEffect(() => {
    // Bloqueio em modo paisagem, se necessário
    gerar_grafico_fase();
    // gerar_grafico_modulo();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
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
