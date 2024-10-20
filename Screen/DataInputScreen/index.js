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

    // geraOndaQuadrada();
    geraOndaSenoidalRetificada();

    return () => {
      console.log(
        "Finalizando tela: Tela de entrada de dados para efetuar os cálculos"
      );
      // Destrava a orientação da tela
      ScreenOrientation.unlockAsync();
    };
  }, []);

  //Seguindo o jupyter notebook "Geração do Sinal Emitido"
  const [intervaloInicial, setIntervaloInicial] = useState(-3); // t0
  const [intervaloFinal, setIntervaloFinal] = useState(3); //tf
  const [passo, setPasso] = useState(0.01); //passo
  const [frequenciaFundamental, setFrequenciaFundamental] = useState(0.5); //f0
  const [coordX, setCoordX] = useState([]); //coordenada de X
  const [coordY, setCoordY] = useState([]); //coordenada de Y
  const[qtdHarmonicas,setQtdHarmonicas] = useState(100);

  const geraOndaQuadrada = () => {
    try {
      setCoordY([]);
      setCoordX([]);
      for (let t = intervaloInicial; t < intervaloFinal; t += passo) {
        const coordY = Math.sign(
          Math.sin(2 * Math.PI * frequenciaFundamental * t)
        );
        setCoordY((prevCoordY) => [...prevCoordY, coordY]);
        setCoordX((prevCoordx) => [...prevCoordx, t]);
      }
    } catch (e) {
      console.log("Erro:", e);
    } finally {
      console.log("Coordenadas de Y:", coordY);
      console.log("Coordenadas de X:", coordX);
    }
  };

  const geraOndaDenteSerra = () => { // não estou levando em consideração a fase
    try {
      setCoordY([]);
      setCoordX([]);
      let A_n;
      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        let somaHarmonicas = 0;
  
        for (let n = 1; n <= qtdHarmonicas; n++) {
          
          A_n = 2 / (n * Math.PI);

          somaHarmonicas += A_n * Math.cos(2 * Math.PI * n * frequenciaFundamental * t);
        }
        setCoordY((prevCoordY) => [...prevCoordY, somaHarmonicas]);
        setCoordX((prevCoordx) => [...prevCoordx, t]);
      }
    } catch (e) {
      console.log("Erro:", e);
    } finally {
      console.log("Coordenadas de X:", coordX);
      console.log("Coordenadas de Y:", coordY);
    }
  };

  const geraOndaTriangular = () => { //não estou levando em consideração a fase
    try {
      setCoordY([]);
      setCoordX([]);
      let A_n;
      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        let somaHarmonicas = 0;
  
        for (let n = 1; n <= qtdHarmonicas; n ++) {
          if(n % 2 != 0){
            A_n = 8 / (Math.pow(Math.PI, 2) * Math.pow(n, 2));
          }
          else{
            A_n = 0;
          }   
          somaHarmonicas += A_n * Math.cos(2 * Math.PI * n * t );
        }
  
        setCoordY((prevCoordY) => [...prevCoordY, somaHarmonicas]);
        setCoordX((prevCoordx) => [...prevCoordx, t]);
      }
    } catch (e) {
      console.log("Erro:", e);
    } finally {
      console.log("Coordenadas de X:", coordX);
      console.log("Coordenadas de Y:", coordY);
    }
  };
  
  geraOndaSenoidalRetificada =() => {
    try {
      setCoordY([]);
      setCoordX([]);
      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        const coordY = Math.abs(Math.sin(2 * Math.PI * frequenciaFundamental * t)) ;

        setCoordY((prevCoordY) => [...prevCoordY, coordY]);
        setCoordX((prevCoordx) => [...prevCoordx, t]);
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
            withVerticalLabels={false} //Acho que através desse atributo é possível filtrar os labels
          />
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
