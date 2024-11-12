import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useContext, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";
import { DataContext } from "../../context/DataContext.js";

export default function FrequencyResponseScreen({ navigation }) {
  const [modulo_coordX, setModulo_CoordX] = useState([]); // coordenada de X
  const [modulo_coordY, setModulo_CoordY] = useState([]); // coordenada de Y
  const [fase_coordX, setFase_CoordX] = useState([]); // coordenada de X
  const [fase_coordY, setFase_CoordY] = useState([]); // coordenada de Y
  const [freqCorte, setFreqCorte] = useState(2); // frequência de corte
  const [passo, setPasso] = useState(0.1); // distância entre as coordenadas de X
  const [freqFinal, setFreqFinal] = useState(50); // frequência final que aparece no gráfico

  const { modulo_x_response, setModulo_X_Response, modulo_y_response, setModulo_Y_Response,
    fase_x_response, setFase_X_Response, fase_y_response, setFase_Y_Response
   } =
    useContext(DataContext);

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

    setModulo_CoordX(labels); // Define os rótulos filtrados no eixo X
    setModulo_CoordY(valores_y); // Define os valores da função de módulo no eixo Y

    setModulo_X_Response(valores_x);
    setModulo_Y_Response(valores_y);
  };

  /* Função para gerar o gráfico da fase da resposta em frequência na tela */
  const gerar_grafico_fase = () => {
    const valores_x = gerar_frequencias(freqFinal, passo); // Alterado passo para 0.5 para simplificar visualização
    const valores_y_radiano = fase_resposta_em_frequencia(valores_x, freqCorte);

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

  useEffect(() => {
    gerar_grafico_fase();
    gerar_grafico_modulo();

    // Bloqueio em modo paisagem
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {modulo_coordX.length > 0 && modulo_coordY.length > 0 && (
          <View>
            <View>
              <LineChart
                data={{
                  labels: modulo_coordX,
                  datasets: [
                    {
                      data: modulo_coordY,
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
            <View>
              <LineChart
                data={{
                  labels: fase_coordX,
                  datasets: [
                    {
                      data: fase_coordY,
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
          </View>

        )}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
