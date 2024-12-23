import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import ListCategory from "../screens/ListCategory"
import ProductDetail from "../screens/ProductDetail"

const Navigator = () => {
    const stack = createNativeStackNavigator()
    return (
        <stack.Navigator>
            <stack.Screen name="Home" component={Home} />
            <stack.Screen name="ListCategory" component={ListCategory} />
            <stack.Screen name="ProductDetail" component={ProductDetail} />
        </stack.Navigator>
    )
}

export default Navigator