import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Orders from "../screens/Orders"
const OrdersStack = () => {
    const stack = createNativeStackNavigator ()
return (
    <stack.Navigator>
        <stack.Screen name="Ordenes" component={Orders} />
    </stack.Navigator>
)
}

export default OrdersStack