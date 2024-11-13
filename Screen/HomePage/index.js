import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useContext, useCallback, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ScreenOrientation from "expo-screen-orientation";
import { DataContext } from "../../context/DataContext";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles.js";

export default function HomePage({ navigation }) {
  const {
    tipoOnda,
    setTipoOnda,
    frequenciaFundamental,
    setFrequenciaFundamental,
    frequenciaCorte,
    setFrequenciaCorte,
    setModulo_X_Input,
    setModulo_Y_Input,
    setModulo_X_Response,
    setModulo_Y_Response,
    setFase_X_Input,
    setFase_Y_Input,
    setFase_X_Response,
    setFase_Y_Response,
  } = useContext(DataContext);

  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
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
    if (!tipoOnda) {
      setTipoOnda("Senoide Retificada");
    }
  }, [tipoOnda, setTipoOnda]);

  useEffect(() => {
    setModulo_X_Input([]);
    setModulo_Y_Input([]);
    setModulo_X_Response([]);
    setModulo_Y_Response([]);
    setFase_X_Input([]);
    setFase_Y_Input([]);
    setFase_X_Response([]);
    setFase_Y_Response([]);
  }, [tipoOnda, frequenciaCorte, frequenciaFundamental]);

  const handleFrequenciaFundamentalChange = (value) => {
    if (value === "") {
      setFrequenciaFundamental("");
    } else {
      const numValue = parseInt(value, 10);
      if (numValue >= 1 && numValue <= 100) {
        setFrequenciaFundamental(value);
      } else {
        Alert.alert(
          "Erro",
          "A frequência fundamental deve estar entre 1 kHz e 100 kHz."
        );
      }
    }
  };

  const handleFrequenciaCorteChange = (value) => {
    if (value === "") {
      setFrequenciaCorte("");
    } else {
      const numValue = parseInt(value, 10);
      if (numValue >= 1 && numValue <= 100) {
        setFrequenciaCorte(value);
      } else {
        Alert.alert(
          "Erro",
          "A frequência de corte deve estar entre 1 kHz e 100 kHz."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Onda</Text>
      <Picker
        selectedValue={tipoOnda}
        onValueChange={(itemValue) => setTipoOnda(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Senoide Retificada" value="Senoide Retificada" />
        <Picker.Item label="Quadrada" value="Quadrada" />
        <Picker.Item label="Triangular" value="Triangular" />
        <Picker.Item label="Dente de Serra" value="Dente de Serra" />
      </Picker>

      <Text style={styles.label}>Frequência Fundamental (kHz)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={frequenciaFundamental}
        onChangeText={handleFrequenciaFundamentalChange}
        placeholder="Digite a frequência fundamental"
      />

      <Text style={styles.label}>Frequência de Corte (kHz)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={frequenciaCorte}
        onChangeText={handleFrequenciaCorteChange}
        placeholder="Digite a frequência de corte"
      />
    </View>
  );
}
