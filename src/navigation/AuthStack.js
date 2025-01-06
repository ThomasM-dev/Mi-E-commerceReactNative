import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginUser from '../screens/LoginUser';
import ProfileUser from '../screens/ProfileUser';
import SigNupUserStack from './SigNupUserStack';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginUser" component={LoginUser} />
      <Stack.Screen name="ProfileUser" component={ProfileUser} />
      <Stack.Screen name="SigNupUser" component={SigNupUserStack} />
    </Stack.Navigator>
  );
};
export default AuthStack;
