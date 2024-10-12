import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importando as telas
import Home from "./Screen/HomePage";
import DataImputScreen from "./Screen/DataInputScreen";
import FrequencyDomainInputScreen from "./Screen/FrequencyDomainInputScreen";
import FrequencyResponseScreen from "./Screen/FrequencyResponseScreen";
import ImpulseResponseScreen from "./Screen/ImpulseResponseScreen";
import OutputSpectrumScreen from "./Screen/OutputSpectrumScreen";
import TimeDomainInputScreen from "./Screen/TimeDomainInputScreen";
import TimeDomaOutputScreen from "./Screen/TimeDomainOutputScreen";

/* Pacotes para instalar: 
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated
npm install mathjs
npm install react-native-svg
npm install react-native-chart-kit


*/

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomePage">
        <Drawer.Screen
          name="HomePage"
          component={Home}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="DataInputScreen"
          component={DataImputScreen}
          options={{ title: "Data ImputScreen", headerShown: false }}
        />
        <Drawer.Screen
          name="FrequencyDomainInputScreen"
          component={FrequencyDomainInputScreen}
          options={{
            title: "Frequency DomainInput Screen",
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="FrequencyResponseScreen"
          component={FrequencyResponseScreen}
          options={{ title: "Frequency Response Screen", headerShown: false }}
        />
        <Drawer.Screen
          name="ImpulseResponseScreen"
          component={ImpulseResponseScreen}
          options={{ title: "Impulse Response Screen", headerShown: false }}
        />
        <Drawer.Screen
          name="OutputSpectrumScreen"
          component={OutputSpectrumScreen}
          options={{ title: "Output Spectrum Screen", headerShown: false }}
        />
        <Drawer.Screen
          name="TimeDomainInputScreen"
          component={TimeDomainInputScreen}
          options={{ title: "Time Domain Input Screen", headerShown: false }}
        />
        <Drawer.Screen
          name="TimeDomainOutputScreen"
          component={TimeDomaOutputScreen}
          options={{ title: "Time Domain Output Screen", headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
