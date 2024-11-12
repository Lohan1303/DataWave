import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [modulo_x_input, setModulo_X_Input] = useState([]);
  const [modulo_y_input, setModulo_Y_Input] = useState([]);
  const [modulo_x_response, setModulo_X_Response] = useState([]);
  const [modulo_y_response, setModulo_Y_Response] = useState([]);
  const [modulo_x_output, setModulo_X_Output] = useState([]);
  const [modulo_y_output, setModulo_Y_Output] = useState([]);
  const [fase_x_input, setFase_X_Input] = useState([]);
  const [fase_y_input, setFase_Y_Input] = useState([]);
  const [fase_x_response, setFase_X_Response] = useState([]);
  const [fase_y_response, setFase_Y_Response] = useState([]);
  const [fase_x_output, setFase_X_Output] = useState([]);
  const [fase_y_output, setFase_Y_Output] = useState([]);

  const [tipoOnda, setTipoOnda] = useState("");
  const [frequenciaFundamental, setFrequenciaFundamental] = useState("");
  const [frequenciaCorte, setFrequenciaCorte] = useState("");

  return (
    <DataContext.Provider
      value={{
        modulo_x_input,
        setModulo_X_Input,
        modulo_y_input,
        setModulo_Y_Input,
        modulo_x_response,
        setModulo_X_Response,
        modulo_y_response,
        setModulo_Y_Response,
        modulo_x_output,
        setModulo_X_Output,
        modulo_y_output,
        setModulo_Y_Output,
        fase_x_input,
        setFase_X_Input,
        fase_y_input,
        setFase_Y_Input,
        fase_x_response,
        setFase_X_Response,
        fase_y_response,
        setFase_Y_Response,
        fase_x_output,
        setFase_X_Output,
        fase_y_output,
        setFase_Y_Output,
        tipoOnda,
        setTipoOnda,
        frequenciaFundamental,
        setFrequenciaFundamental,
        frequenciaCorte,
        setFrequenciaCorte,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
