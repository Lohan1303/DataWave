import { StatusBar } from "expo-status-bar";
import { View, Text, Alert, ScrollView } from "react-native";
import { useEffect, useContext, useState, useCallback } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "./styles.js";
import { LineChart } from "react-native-chart-kit";
import { DataContext } from "../../context/DataContext.js";
import { useFocusEffect } from "@react-navigation/native";

export default function DataImputScreen({ navigation }) {
  const { tipoOnda, frequenciaFundamental } = useContext(DataContext);

  const [intervaloInicial, setIntervaloInicial] = useState(-2);
  const [intervaloFinal, setIntervaloFinal] = useState(2);
  const [passo, setPasso] = useState(0.01);
  const [coordX, setCoordX] = useState([]);
  const [coordY, setCoordY] = useState([]);
  const [qtdHarmonicas, setQtdHarmonicas] = useState(300);

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
    if (frequenciaFundamental && tipoOnda) {
      setIntervaloInicial(-3 / frequenciaFundamental);
      setIntervaloFinal(3 / frequenciaFundamental);
      setPasso(0.01 / frequenciaFundamental);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
      Alert.alert(
        "Aviso",
        "Por favor, preencha o tipo de onda e a frequência fundamental."
      );
    }
  }, [frequenciaFundamental, tipoOnda]);

  useEffect(() => {
    switch (tipoOnda) {
      case "quadrada":
        geraOndaQuadrada();
        break;
      case "dente_de_serra":
        geraOndaDenteSerra();
        break;
      case "triangular":
        geraOndaTriangular();
        break;
      case "senoidal":
        geraOndaSenoidalRetificada();
        break;
      default:
        console.log("Tipo de onda não reconhecido.");
    }
  }, [
    intervaloInicial,
    intervaloFinal,
    passo,
    frequenciaFundamental,
    tipoOnda,
  ]);

  const geraOndaQuadrada = () => {
    try {
      const novasCoordX = [];
      const novasCoordY = [];
      const periodo = 1 / frequenciaFundamental;

      for (let t = intervaloInicial; t < intervaloFinal; t += passo) {
        const coordY = Math.sign(
          Math.sin(2 * Math.PI * frequenciaFundamental * t)
        );

        novasCoordY.push(coordY);
        novasCoordX.push(
          Math.abs(t).toFixed(100) % periodo < passo ? t.toFixed(3) : ""
        );
      }

      setCoordY(novasCoordY);
      setCoordX(novasCoordX);
    } catch (e) {
      console.log("Erro:", e);
    }
  };

  const geraOndaDenteSerra = () => {
    try {
      const novasCoordX = [];
      const novasCoordY = [];
      const periodo = 1 / frequenciaFundamental;

      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        let somaHarmonicas = 0;

        for (let n = 1; n <= qtdHarmonicas; n++) {
          let A_n = 2 / (Math.PI * n);
          let faseHarmonica = n % 2 === 0 ? Math.PI / 2 : -Math.PI / 2;

          somaHarmonicas +=
            A_n *
            Math.cos(
              2 * Math.PI * n * frequenciaFundamental * t + faseHarmonica
            );
        }

        novasCoordY.push(somaHarmonicas);
        novasCoordX.push(
          Math.abs(t).toFixed(100) % periodo < passo ? t.toFixed(3) : ""
        );
      }

      setCoordY(novasCoordY);
      setCoordX(novasCoordX);
    } catch (e) {
      console.log("Erro:", e);
    }
  };

  const geraOndaTriangular = () => {
    try {
      setCoordY([]);
      setCoordX([]);
      const periodo = 1 / frequenciaFundamental;

      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        let somaHarmonicas = 0;

        for (let n = 1; n <= qtdHarmonicas; n++) {
          let A_n =
            n % 2 !== 0 ? 8 / (Math.pow(Math.PI, 2) * Math.pow(n, 2)) : 0;
          let fase = ((n - 1) / 2) % 2 === 0 ? -Math.PI / 2 : Math.PI / 2;

          somaHarmonicas +=
            A_n * Math.cos(2 * Math.PI * n * frequenciaFundamental * t + fase);
        }

        setCoordY((prevCoordY) => [...prevCoordY, somaHarmonicas]);
        setCoordX((prevCoordX) => [
          ...prevCoordX,
          Math.abs(t).toFixed(100) % periodo < passo ? t.toFixed(3) : "",
        ]);
      }
    } catch (e) {
      console.log("Erro:", e);
    }
  };

  const geraOndaSenoidalRetificada = () => {
    try {
      setCoordY([]);
      setCoordX([]);
      const meio_periodo = 1 / (2 * frequenciaFundamental);

      for (let t = intervaloInicial; t <= intervaloFinal; t += passo) {
        const coordY = Math.abs(
          Math.sin(2 * Math.PI * frequenciaFundamental * t)
        );
        setCoordY((prevCoordY) => [...prevCoordY, coordY]);
        setCoordX((prevCoordx) => [
          ...prevCoordx,
          Math.abs(t).toFixed(100) % meio_periodo < passo ? t.toFixed(3) : "",
        ]);
      }
    } catch (e) {
      console.log("Erro:", e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {coordX.length > 0 && coordY.length > 0 && (
          <>
            <Text style={styles.chartTitle}>{tipoOnda}</Text>
            <LineChart
              data={{
                labels: coordX,
                datasets: [
                  {
                    data: coordY,
                    withDots: true,
                    lineColor: "#4e73df",
                  },
                ],
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
          </>
        )}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
