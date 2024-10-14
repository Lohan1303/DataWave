import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./styles.js";
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';


export default function ImpulseResponseScreen({ navigation }) {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    geraOndaSonoideRetificada();

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
    const[passo,setPasso]= useState(0.05);  //passo
    const[frequenciaFundamental, setFrequenciaFundamental] = useState(0.5); //f0
    const[coordX,setCoordX] = useState([]); //coordenada de X
    const[coordY,setCoordY] = useState([]); //coordenada de Y
    const[amplitude,setAmplitude] = useState(0.5);

    const geraOndaSonoideRetificada = () => { //não estou levando em consideração a fase
      try {

        for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
          // console.log(Math.abs(Math.sin(2 * Math.PI * frequenciaFundamental * t)));
          coordX.push(t);
          coordY.push(amplitude * Math.abs(Math.sin(2 * Math.PI * frequenciaFundamental * t)));  
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
          width={700}  
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
