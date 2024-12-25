import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Cart from "../screens/Cart"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const CartStack = () => {
    const Stack = createNativeStackNavigator()
return(
    <Stack.Navigator>
        <Stack.Screen
        name="carrito" 
        component={Cart}/>
    </Stack.Navigator>
)
}

export default CartStack