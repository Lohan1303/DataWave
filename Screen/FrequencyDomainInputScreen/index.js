import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import React, { useState, useContext } from "react";
import { LineChart } from "react-native-chart-kit";
import { DataContext } from "../../context/DataContext.js";

export default function FrequencyDomainInputScreen({ navigation }) {
  const [coordX, setCoordX] = useState([]); // Coordinate X values
  const [coordY, setCoordY] = useState([]); // Coordinate Y values
  const [qtdHarmonicas, setQtdHarmonicas] = useState(50);

  const { x_input, setX_Input, y_input, setY_Input } = useContext(DataContext);

  useEffect(() => {
    // gera_An_Quadrada();
    // gera_An_Triangular();
    // gera_An_DenteSerra();
    // gera_An_SenRetificada();

    // gera_Fase_Quadrada();
    // gera_Fase_Triangular();
    // gera_Fase_DenteSerra();
    gera_Fase_SenoideRetificada();
    //corrigir, pois não está atribuindo o valor ao setX_Input e setY_Input
    setX_Input(coordX);
    setY_Input(coordY);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    console.log("Entered screen for frequency domain input");
    console.log(coordX);

    return () => console.log("Exiting frequency domain input screen");
  }, []);

  const gera_An_Quadrada = () => {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      for (let n = 1; n <= qtdHarmonicas; n++) {
        if (n % 2 === 0) {
          tempCoordX.push("");
          tempCoordY.push("");
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

  const gera_An_Triangular = () => {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      for (let n = 1; n <= qtdHarmonicas; n++) {
        if (n % 2 === 0) {
          tempCoordX.push("");
          tempCoordY.push("");
        } else {
          tempCoordX.push(n);
          tempCoordY.push(8 / (Math.pow(Math.PI, 2) * Math.pow(n, 2)));
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

  const gera_An_DenteSerra = () => {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      for (let n = 1; n <= qtdHarmonicas; n++) {
        tempCoordX.push(n);
        tempCoordY.push(2 / (Math.PI * n));
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

  const gera_An_SenRetificada = () => {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      for (let n = 1; n <= qtdHarmonicas; n++) {
        if (n % 2 === 0) {
          tempCoordX.push("");
          tempCoordY.push("");
        } else {
          tempCoordX.push(n);
          tempCoordY.push(2 / (Math.PI * n));
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

  const gera_Fase_Quadrada = () => {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      tempCoordY.push("");
      tempCoordX.push("");
      for (let n = 1; n <= qtdHarmonicas; n++) {
        tempCoordX.push(n);
        tempCoordY.push(-90); // Fase constante de -90 graus como número
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

  const gera_Fase_Triangular = () => {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      for (let n = 1; n <= qtdHarmonicas; n++) {
        if (n % 2 === 1) {
          if (Math.floor(n / 2) % 2 === 0) {
            tempCoordX.push(n);
            tempCoordY.push(-90);
          } else {
            tempCoordX.push(n);
            tempCoordY.push(90);
          }
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

  const gera_Fase_DenteSerra = () => {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      for (let n = 1; n <= qtdHarmonicas; n++) {
        if (n % 2 === 0) {
          tempCoordX.push(n);
          tempCoordY.push(90);
        } else {
          tempCoordX.push(n);
          tempCoordY.push(-90);
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

  async function gera_Fase_SenoideRetificada() {
    try {
      let tempCoordX = [];
      let tempCoordY = [];

      for (let n = 1; n <= qtdHarmonicas; n++) {
        tempCoordX.push(n);

        if (n % 2 === 0) {
          tempCoordY.push("");
        } else {
          tempCoordY.push(90);
        }
      }
      setCoordX(tempCoordX);
      console.log(tempCoordX);
      setCoordY(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", coordX);
      console.log("Y Coordinates:", coordY);
    }
  }

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
          withShadow={false}
          withInnerLines={false}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
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
