import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useCallback } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState, useContext } from "react";
import { LineChart } from "react-native-chart-kit";
import { DataContext } from "../../context/DataContext.js";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles.js";

export default function FrequencyDomainInputScreen({ navigation }) {
  const [modulo_coordX, setModulo_CoordX] = useState([]); // Coordinate X values
  const [modulo_coordY, setModulo_CoordY] = useState([]); // Coordinate Y values
  const [fase_coordX, setFase_CoordX] = useState([]); // Coordinate X values
  const [fase_coordY, setFase_CoordY] = useState([]); // Coordinate Y values
  const [qtdHarmonicas, setQtdHarmonicas] = useState(50);
  const { tipoOnda } = useContext(DataContext);

  const {
    setModulo_X_Input,
    setModulo_Y_Input,
    setFase_X_Input,
    setFase_Y_Input,
  } = useContext(DataContext);

  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
          );
        } catch (error) {
          console.error("Erro ao bloquear a orientação:", error);
        }
      };
      lockOrientation();
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  useEffect(() => {
    if (tipoOnda) {
      switch (tipoOnda) {
        case "Quadrada":
          gera_An_Quadrada();
          gera_Fase_Quadrada();
          break;
        case "Dente de Serra":
          gera_An_DenteSerra();
          gera_Fase_DenteSerra();
          break;
        case "Triangular":
          gera_An_Triangular();
          gera_Fase_Triangular();
          break;
        case "Senoide Retificada":
          gera_An_SenRetificada();
          gera_Fase_SenoideRetificada();
          break;
        default:
          console.log("Tipo de onda não reconhecido.");
      }
    }
  }, [tipoOnda]);

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

      setModulo_CoordX(tempCoordX);
      setModulo_CoordY(tempCoordY);

      setModulo_X_Input(tempCoordX);
      setModulo_Y_Input(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", modulo_coordX);
      console.log("Y Coordinates:", modulo_coordY);
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

      setModulo_CoordX(tempCoordX);
      setModulo_CoordY(tempCoordY);

      setModulo_X_Input(tempCoordX);
      setModulo_Y_Input(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", modulo_coordX);
      console.log("Y Coordinates:", modulo_coordY);
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

      setModulo_CoordX(tempCoordX);
      setModulo_CoordY(tempCoordY);

      setModulo_X_Input(tempCoordX);
      setModulo_Y_Input(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", modulo_coordX);
      console.log("Y Coordinates:", modulo_coordY);
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

      setModulo_CoordX(tempCoordX);
      setModulo_CoordY(tempCoordY);

      setModulo_X_Input(tempCoordX);
      setModulo_Y_Input(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", modulo_coordX);
      console.log("Y Coordinates:", modulo_coordY);
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

      setFase_CoordX(tempCoordX);
      setFase_CoordY(tempCoordY);

      setFase_X_Input(tempCoordX);
      setFase_Y_Input(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", fase_coordX);
      console.log("Y Coordinates:", fase_coordY);
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

      setFase_CoordX(tempCoordX);
      setFase_CoordY(tempCoordY);

      setFase_X_Input(tempCoordX);
      setFase_Y_Input(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", fase_coordX);
      console.log("Y Coordinates:", fase_coordY);
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
      setFase_CoordX(tempCoordX);
      setFase_CoordY(tempCoordY);

      setFase_X_Input(tempCoordX);
      setFase_Y_Input(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", fase_coordX);
      console.log("Y Coordinates:", fase_coordY);
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
      setFase_CoordX(tempCoordX);
      setFase_CoordY(tempCoordY);

      setFase_X_Input(tempCoordX);
      setFase_Y_Input(tempCoordY);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      console.log("X Coordinates:", fase_coordX);
      console.log("Y Coordinates:", fase_coordY);
    }
  }

  if (modulo_coordX.length === 0 || modulo_coordY.length === 0) {
    return <Text>Loading chart data...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.chartTitle}>Modulo</Text>
          <LineChart
            data={{
              labels: modulo_coordX,
              datasets: [{ data: modulo_coordY }],
            }}
            width={700}
            height={300}
            chartConfig={{
              backgroundColor: "#1f1f1f",
              backgroundGradientFrom: "#2d2d2d",
              backgroundGradientTo: "#2d2d2d",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                marginLeft: 20, // Ajustando as margens
                marginRight: 20,
              },
            }}
            style={styles.chart}
            withVerticalLabels
            withShadow
            withInnerLines
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            xLabelsOffset={-5}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.chartTitle}>Fase</Text>
          <LineChart
            data={{
              labels: fase_coordX,
              datasets: [{ data: fase_coordY }],
            }}
            width={700}
            height={300}
            chartConfig={{
              backgroundColor: "#1f1f1f",
              backgroundGradientFrom: "#2d2d2d",
              backgroundGradientTo: "#2d2d2d",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                marginLeft: 20,
                marginRight: 20,
              },
            }}
            style={styles.chart}
            withVerticalLabels
            withShadow
            withInnerLines
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            xLabelsOffset={-5}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
