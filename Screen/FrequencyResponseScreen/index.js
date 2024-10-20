import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./styles.js";
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

export default function FrequencyResponseScreen({ navigation }) {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    geraOndaDenteSerra();

    console.log(
      "Entrando na Tela para apresentação do gráfico do espectro do sinal de entrada (amplitude e fase de cada componente senoidal)"
    );
    return () => {
      console.log(
        "Finalizando tela: Tela para apresentação do gráfico do espectro do sinal de entrada (amplitude e fase de cada componente senoidal)"
      );
    };
  }, []);


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
