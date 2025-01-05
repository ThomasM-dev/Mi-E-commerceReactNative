import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginUser from '../screens/LoginUser';
import ProfileUser from '../screens/ProfileUser';

const LoginUserStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Iniciar Sesion"
        component={LoginUser}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ProfileUser"
        component={ProfileUser}
      />
    </Stack.Navigator>
  );
};
export default LoginUserStack;
