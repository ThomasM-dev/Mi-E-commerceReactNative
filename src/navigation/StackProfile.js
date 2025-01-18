import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileUser from "../screens/ProfileUser"

const StackProfile = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileUser" component={ProfileUser} />
        </Stack.Navigator>
    )
}

export default StackProfile