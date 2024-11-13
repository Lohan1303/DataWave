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
import FrequencyDomainOutputScreen from "./Screen/FrequencyDomainOutputScreen";
import TimeDomainInputScreen from "./Screen/TimeDomainInputScreen";
import TimeDomaOutputScreen from "./Screen/TimeDomainOutputScreen";
import { DataProvider } from "./context/DataContext";
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
    <DataProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomePage"
          screenOptions={{
            headerTintColor: "white",
            drawerStyle: { backgroundColor: "black" },
            drawerLabelStyle: { color: "white" },
          }}
        >
          <Drawer.Screen
            name="HomePage"
            component={Home}
            options={{
              title: "Data input",
              headerStyle: { backgroundColor: "black" },
            }}
          />
          <Drawer.Screen
            name="DataInputScreen"
            component={DataImputScreen}
            options={{
              title: "Input chart",
              headerTitle: "Input chart",
              headerStyle: { backgroundColor: "black", height: 50 },
            }}
          />
          <Drawer.Screen
            name="FrequencyDomainInputScreen"
            component={FrequencyDomainInputScreen}
            options={{
              title: "Frequency Domain Input Chart",
              headerTitle: "Frequency Domain Input Chart",
              headerStyle: { backgroundColor: "black", height: 50 },
            }}
          />
          <Drawer.Screen
            name="FrequencyResponseScreen"
            component={FrequencyResponseScreen}
            options={{
              title: "Frequency Response Chart",
              headerTitle: "Frequency Response Chart",
              headerStyle: { backgroundColor: "black", height: 50 },
            }}
          />
          {/* <Drawer.Screen
            name="ImpulseResponseScreen"
            component={ImpulseResponseScreen}
            options={{ title: "Impulse Response Screen", headerShown: false }}
          /> */}
          <Drawer.Screen
            name="FrequencyDomainOutputScreen"
            component={FrequencyDomainOutputScreen}
            options={{
              title: "Frequency Domain Output Chart",
              headerTitle: "Frequency Domain Output Chart",
              headerStyle: { backgroundColor: "black", height: 50 },
            }}
          />
          {/* <Drawer.Screen
            name="TimeDomainInputScreen"
            component={TimeDomainInputScreen}
            options={{ title: "Time Domain Input Screen", headerShown: false }}
          /> */}
          <Drawer.Screen
            name="TimeDomainOutputScreen"
            component={TimeDomaOutputScreen}
            options={{
              title: "Time Domain Output Chart",
              headerTitle: "Time Domain Output Chart",
              headerStyle: { backgroundColor: "black", height: 50 },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
