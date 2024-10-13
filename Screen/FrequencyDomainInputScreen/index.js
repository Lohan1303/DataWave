import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./styles.js";
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

export default function FrequencyDomainInputScreen({ navigation }) {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    geraOndaTriangular();

    console.log(
      "Entrando na Tela para apresentação do gráfico do espectro do sinal de entrada (amplitude e fase de cada componente senoidal)"
    );
    return () => {
      console.log(
        "Finalizando tela: Tela para apresentação do gráfico do espectro do sinal de entrada (amplitude e fase de cada componente senoidal)"
      );
    };
  }, []);

    //Seguindo o jupyter notebook "Geração do Sinal Emitido"
    const[intervaloInicial,setIntervaloInicial] = useState(-3); // t0
    const[intervaloFinal,setIntervaloFinal] = useState(3); //tf
    const[passo,setPasso]= useState(0.1);  //passo
    const[frequenciaFundamental, setFrequenciaFundamental] = useState(0.5); //f0
    const[coordX,setCoordX] = useState([]); //coordenada de X
    const[coordY,setCoordY] = useState([]); //coordenada de Y
    const[qtdHarmonicas,setQtdHarmonicas] = useState(100);
  
    const geraOndaTriangular = () => { //não estou levando em consideração a fase
      try {
        let A_n;
        for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
          let somaHarmonicas = 0;
    
          // Para cada harmônica ímpar
          for (let n = 1; n <= qtdHarmonicas; n ++) {
            if(n % 2 != 0){
              A_n = 8 / (Math.pow(Math.PI, 2) * Math.pow(n, 2));
            }
            else{
              A_n = 0;
            }   
            // Cálculo da soma da série de Fourier
            somaHarmonicas += A_n * Math.cos(2 * Math.PI * n * t );
          }
    
          // Armazena os valores de X e Y
          coordX.push(t);
          coordY.push(somaHarmonicas);  // Y será a soma das harmônicas
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
      <View>
    {/* Documentação: https://www.npmjs.com/package/react-native-chart-kit */}
    <LineChart
          data={{
            labels: coordX.map(String), 
            datasets: [
              {
                data: coordY,
              },
            ],
          }}
          width={800}  
          height={300} 
          withVerticalLabels = {false} //Acho que através desse atributo é possível filtrar os labels 
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
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
