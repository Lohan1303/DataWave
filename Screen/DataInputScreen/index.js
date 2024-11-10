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
    geraOndaDenteSerra();
    // geraOndaTriangular();
    // geraOndaQuadrada();
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
  const [fase,setFase] = useState(1);

  const geraOndaQuadrada = () => {
    try {
      const novasCoordX = [];
      const novasCoordY = [];
      const periodo = (1 / (frequenciaFundamental)); // Cálculo do período da onda
  
      for (let t = intervaloInicial; t < intervaloFinal; t += passo) {
        // Aplicando a fase na fórmula do seno
        const coordY = Math.sign(
          Math.sin(2 * Math.PI * frequenciaFundamental * t - (Math.PI * fase)) // Fase aplicada
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
    // não estou levando em consideração a fase
    try {
      setCoordY([]);
      setCoordX([]);
      let A_n;
      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        let somaHarmonicas = 0;
        let somaHarmonicas_1 = 0;
        let somaHarmonicas_2 = 0;

        for (let n = 1; n <= qtdHarmonicas; n++) {
          //let A_n = (2 * Math.pow(-1, n + 1)) / n;
          let A_n = 2 / (Math.PI * n);
          let A_n_1 = 2 / (Math.PI * n - 1);
          let A_n_2 = 2 / (Math.PI * n + 1);

          somaHarmonicas +=
            -A_n * Math.sin(2 * Math.PI * n * frequenciaFundamental * t);
          somaHarmonicas_1 +=
            -A_n_1 *
            Math.sin(2 * Math.PI * n * frequenciaFundamental * (t - passo));
          somaHarmonicas_2 +=
            -A_n_2 *
            Math.sin(2 * Math.PI * n * frequenciaFundamental * (t + passo));
        }

        // Armazenando os valores em X e Y
        setCoordY((prevCoordY) => [...prevCoordY, somaHarmonicas]);

        if (
          somaHarmonicas_1 > somaHarmonicas &&
          somaHarmonicas <= somaHarmonicas_2
        ) {
          setCoordX((prevCoordX) => [...prevCoordX, (t + passo).toFixed(2)]);
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
    //não estou levando em consideração a fase
    try {
      setCoordY([]);
      setCoordX([]);
      let A_n;
      const periodo = 1 / frequenciaFundamental; // Cálculo do período da onda
      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        let somaHarmonicas = 0;

        for (let n = 1; n <= qtdHarmonicas; n++) {
          if (n % 2 != 0) {
            A_n = 8 / (Math.pow(Math.PI, 2) * Math.pow(n, 2));
          } else {
            A_n = 0;
          }
          somaHarmonicas += A_n * Math.cos(2 * Math.PI * n * t);
        }

        setCoordY((prevCoordY) => [...prevCoordY, somaHarmonicas]);
        if (Math.abs(t).toFixed(5) % periodo < passo) {
          setCoordX((prevCoordx) => [...prevCoordx, t.toFixed(1)]);
        } else {
          setCoordX((prevCoordx) => [...prevCoordx, ""]);
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
        const coordY = Math.abs(Math.sin(2 * Math.PI * frequenciaFundamental * t)); // Cálculo de Y
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
            withInnerLines={true}
            withVerticalLabels={true} //Acho que através desse atributo é possível filtrar os labels
            xLabelsOffset={-5}
          ></LineChart>
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
