import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileUser from "../screens/ProfileUser"
import ImageSelector from "../screens/ImageSelector"

const StackProfile = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileUser" component={ProfileUser} />
            <Stack.Screen name="ImgSelector" component={ImageSelector} />
        </Stack.Navigator>
    )
}

export default StackProfile