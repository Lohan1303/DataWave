import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [x_input, setX_Input] = useState([]);
  const [y_input, setY_Input] = useState([]);
  const [x_response, setX_Response] = useState([]);
  const [y_response, setY_Response] = useState([]);
  const [x_output, setX_Output] = useState([]);
  const [y_output, setY_Output] = useState([]);

  return (
    <DataContext.Provider
      value={{
        x_input,
        setX_Input,
        y_input,
        setY_Input,
        x_response,
        setX_Response,
        y_response,
        setY_Response,
        x_output,
        setX_Output,
        y_output,
        setY_Output,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
