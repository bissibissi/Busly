import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import "./config/firebase";
import home from './screens/home';
import registro_pasajeros from './screens/registro_pasajeros';
import registro_drivers from './screens/registro_drivers';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={home} />
        <Stack.Screen name="RegisterPassenger" component={registro_pasajeros} />
        <Stack.Screen name="RegisterDriver" component={registro_drivers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
