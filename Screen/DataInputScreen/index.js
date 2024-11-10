import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";

export default function DataImputScreen({ navigation }) {
  useEffect(() => {
    // Trava a orientação em modo paisagem
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    console.log(
      "Entrando na Tela de entrada de dados para efetuar os cálculos"
    );

    // geraOndaSenoidalRetificada();
    // geraOndaDenteSerra();
    // geraOndaTriangular();
    geraOndaQuadrada();
    return () => {
      console.log(
        "Finalizando tela: Tela de entrada de dados para efetuar os cálculos"
      );
      // Destrava a orientação da tela
      ScreenOrientation.unlockAsync();
    };
  }, []);

  //Seguindo o jupyter notebook "Geração do Sinal Emitido"
  const [intervaloInicial, setIntervaloInicial] = useState(-2); // t0
  const [intervaloFinal, setIntervaloFinal] = useState(2); //tf
  const [passo, setPasso] = useState(0.01); //passo
  const [frequenciaFundamental, setFrequenciaFundamental] = useState(1); //f0
  const [coordX, setCoordX] = useState([]); //coordenada de X
  const [coordY, setCoordY] = useState([]); //coordenada de Y
  const [qtdHarmonicas, setQtdHarmonicas] = useState(300);

  const geraOndaQuadrada = () => {
    try {
      const novasCoordX = [];
      const novasCoordY = [];
      const periodo = (1 / (frequenciaFundamental)); // Cálculo do período da onda

      for (let t = intervaloInicial; t < intervaloFinal; t += passo) {
        // Aplicando a fase na fórmula do seno
        const coordY = Math.sign(
          Math.sin(2 * Math.PI * frequenciaFundamental * t ) // Fase aplicada
        );

        // Acumulando coordenadas de Y
        novasCoordY.push(coordY);

        // Verificando quando a onda atinge zero (ou outro ponto desejado) para coordX
        if (Math.abs(t).toFixed(5) % periodo < passo) {
          novasCoordX.push(t.toFixed(2)); // Adicionando a coordenada X
        } else {
          novasCoordX.push(""); // Caso contrário, deixar em branco
        }
      }

      // Atualizando o estado após o loop
      setCoordY(novasCoordY);
      setCoordX(novasCoordX);

    } catch (e) {
      console.log("Erro:", e);
    } finally {
      console.log("Coordenadas de Y:", coordY);
      console.log("Coordenadas de X:", coordX);
    }
  };


  const geraOndaDenteSerra = () => {
    try {
      setCoordY([]);
      setCoordX([]);
      const periodo = 1 / frequenciaFundamental;

      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        let somaHarmonicas = 0;

        for (let n = 1; n <= qtdHarmonicas; n++) {

          let A_n = 2 / (Math.PI * n);


          let faseHarmonica = 0;
          if (n % 2 === 0) {

            faseHarmonica = Math.PI / 2;
          } else {

            faseHarmonica = -Math.PI / 2;
          }

          // Somando as harmônicas com as fases aplicadas
          somaHarmonicas += A_n * Math.cos(2 * Math.PI * n * frequenciaFundamental * t + faseHarmonica);
        }

        // Armazenando os valores de Y
        setCoordY((prevCoordY) => [...prevCoordY, somaHarmonicas]);

        if (Math.abs(t).toFixed(5) % (periodo) < passo) {
          setCoordX((prevCoordX) => [...prevCoordX, (t).toFixed(2)]);
        } else {
          setCoordX((prevCoordX) => [...prevCoordX, ""]);
        }
      }
    } catch (e) {
      console.log("Erro:", e);
    } finally {
      console.log("Coordenadas de X:", coordX);
      console.log("Coordenadas de Y:", coordY);
    }
  };


  const geraOndaTriangular = () => {
    try {
      setCoordY([]);
      setCoordX([]);
      let A_n;
      const periodo = 1 / frequenciaFundamental; // Cálculo do período da onda

      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        let somaHarmonicas = 0;

        for (let n = 1; n <= qtdHarmonicas; n++) {
          // Definindo A_n para harmônicas ímpares
          if (n % 2 !== 0) {
            A_n = 8 / (Math.pow(Math.PI, 2) * Math.pow(n, 2));
          } else {
            A_n = 0; // As harmônicas pares não contribuem
          }

          // Calculando a fase de acordo com (n-1)/2
          let fase = 0;
          if (((n - 1) / 2) % 2 === 0) {
            fase = -Math.PI / 2; // Fase de -90° (ou -π/2 radianos) para (n-1)/2 par
          } else {
            fase = Math.PI / 2; // Fase de +90° (ou π/2 radianos) para (n-1)/2 ímpar
          }

          // Somando a harmônica com a fase aplicada
          somaHarmonicas += A_n * Math.cos(2 * Math.PI * n * frequenciaFundamental * t + fase);
        }

        // Armazenando os valores de Y
        setCoordY((prevCoordY) => [...prevCoordY, somaHarmonicas]);

        // Atualizando coordX com valores em momentos específicos
        if (Math.abs(t).toFixed(5) % periodo < passo) {
          setCoordX((prevCoordX) => [...prevCoordX, t.toFixed(1)]);
        } else {
          setCoordX((prevCoordX) => [...prevCoordX, ""]);
        }
      }
    } catch (e) {
      console.log("Erro:", e);
    } finally {
      console.log("Coordenadas de X:", coordX);
      console.log("Coordenadas de Y:", coordY);
    }
  };


  const geraOndaSenoidalRetificada = () => {
    try {
      setCoordY([]); // Limpa o array de Y
      setCoordX([]); // Limpa o array de X

      let cond = false; // Flag para capturar o primeiro zero positivo
      const meio_periodo = 1 / (2 * frequenciaFundamental); // Cálculo do meio período

      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        const coordY = Math.abs(Math.sin(2 * Math.PI * frequenciaFundamental * t )); // Cálculo de Y
        setCoordY((prevCoordY) => [...prevCoordY, coordY]); // Atualiza o array de coordenadas Y


        if (Math.abs(t).toFixed(4) % meio_periodo < passo) {
          setCoordX((prevCoordx) => [...prevCoordx, t.toFixed(1)]);
        } else {
          setCoordX((prevCoordx) => [...prevCoordx, '']);
        }
      }
    } catch (e) {
      console.log("Erro:", e);
    } finally {
      console.log("Coordenadas de X:", coordX);
      console.log("Coordenadas de Y:", coordY);
    }
  };


  return (
    <View style={styles.container}>
      {coordX.length > 0 && coordY.length > 0 && (
        <View>
          {/* Documentação: https://www.npmjs.com/package/react-native-chart-kit */}
          <LineChart
            data={{
              labels: coordX,
              datasets: [
                {
                  data: coordY,
                  // Se você não quiser a linha, apenas defina a linha com valores null
                  // Isso efetivamente "remove" a linha conectando os pontos
                  withDots: true,
                  // Adicionar uma condição para não desenhar linhas
                  lineColor: 'transparent' // ou qualquer valor transparente
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
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
            }}
            withVerticalLabels={true}
            withShadow={true}
            withInnerLines={true}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            xLabelsOffset={-5}
          />
          <View style={{ borderColor: 2, border: 2, width: 100 }}></View>
        </View>
      )}

      {/* <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text style={styles.texto}>Voltar para a Home</Text>
      </TouchableOpacity> */}
      <StatusBar style="auto" />
    </View>
  );
}
