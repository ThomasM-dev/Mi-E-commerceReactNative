import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../screens/Orders';
const OrdersStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Order" component={Orders} />
    </Stack.Navigator>
  );
};

export default OrdersStack;
