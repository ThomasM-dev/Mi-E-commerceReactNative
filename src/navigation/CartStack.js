import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Cart from "../screens/Cart"
const CartStack = () => {
    const Stack = createNativeStackNavigator()
return(
    <Stack.Navigator
        screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen
        name="carrito" 
        component={Cart}/>
    </Stack.Navigator>
)
}

export default CartStack