import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Cart from "../screens/Cart"
const CartStack = () => {
    const stack = createNativeStackNavigator()
return(
    <stack.Navigator>
        <stack.Screen name="carrito" component={Cart}/>
    </stack.Navigator>
)
}

export default CartStack