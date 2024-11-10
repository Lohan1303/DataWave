import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from "./styles.js";
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

export default function FrequencyDomainInputScreen({ navigation }) {

  const [coordX, setCoordX] = useState([]); // Coordinate X values
  const [coordY, setCoordY] = useState([]); // Coordinate Y values
  const [qtdHarmonicas, setQtdHarmonicas] = useState(50);

  useEffect(() => {
    gera_An_Quadrada();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    console.log("Entered screen for frequency domain input");

    return () => console.log("Exiting frequency domain input screen");
  }, []);

  const gera_An_Quadrada = () => {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      for (let n = 1; n <= qtdHarmonicas; n++) {
        if (n % 2 === 0) {
          tempCoordX.push('');
          tempCoordY.push('');
        } else {
          tempCoordX.push(n);
          tempCoordY.push(4 / (Math.PI * n));
        }
      }

      setCoordX(tempCoordX);
      setCoordY(tempCoordY);

    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", coordX);
      console.log("Y Coordinates:", coordY);
    }
  };

  if (coordX.length === 0 || coordY.length === 0) {
    return <Text>Loading chart data...</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <LineChart
          data={{
            labels: coordX,
            datasets: [{ data: coordY }],
          }}
          width={800}
          height={300}
          withVerticalLabels={true}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8 }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
