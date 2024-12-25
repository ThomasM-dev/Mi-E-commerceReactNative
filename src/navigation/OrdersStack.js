import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Orders from "../screens/Orders"
const OrdersStack = () => {
    const Stack = createNativeStackNavigator ()
return (
    <Stack.Navigator>
        <Stack.Screen name="Ordenes" component={Orders} />
    </Stack.Navigator>
)
}

export default OrdersStack