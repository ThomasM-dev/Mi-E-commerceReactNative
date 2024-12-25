import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from "./StackNavigator"
import CartStack from "./CartStack"

const Navigation = () => {
return (
    <NavigationContainer>
        <CartStack/>
    </NavigationContainer>
)
}

export default Navigation