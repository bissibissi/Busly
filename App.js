import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import "./config/firebase";
import Home from './screens/home';
import RegistroPasajeros from './screens/registro_pasajeros';
import RegistroDrivers from './screens/registro_drivers';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
       
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="registro_drivers" component={RegistroDrivers} />
        <Stack.Screen name="registro_pasajeros" component={RegistroPasajeros} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
