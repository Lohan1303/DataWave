import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useContext, useCallback, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ScreenOrientation from "expo-screen-orientation";
import { DataContext } from "../../context/DataContext";
import { useFocusEffect } from "@react-navigation/native";

export default function HomePage({ navigation }) {
  // Usando useFocusEffect para garantir que a orientação seja fixada no modo retrato sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        try {
          // Bloqueia a orientação no modo retrato (orientação vertical)
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          );
        } catch (error) {
          console.error("Erro ao bloquear a orientação:", error);
        }
      };

      lockOrientation();

      // Libera a orientação quando a tela perde o foco
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, []) // O array vazio garante que isso será chamado apenas uma vez por foco
  );

  const {
    tipoOnda,
    setTipoOnda,
    frequenciaFundamental,
    setFrequenciaFundamental,
    frequenciaCorte,
    setFrequenciaCorte,
  } = useContext(DataContext);

  // Definindo 'senoidal' como valor padrão para tipoOnda
  useEffect(() => {
    if (!tipoOnda) {
      setTipoOnda("senoidal");
    }
  }, [tipoOnda, setTipoOnda]);

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
        <Picker.Item label="Senoidal" value="senoidal" />
        <Picker.Item label="Quadrada" value="quadrada" />
        <Picker.Item label="Triangular" value="triangular" />
        <Picker.Item label="Dente de Serra" value="dente_de_serra" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
  },
  picker: {
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
});
