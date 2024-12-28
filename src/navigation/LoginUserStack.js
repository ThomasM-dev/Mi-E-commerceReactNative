import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginUser from "../screens/LoginUser"

const LoginUserStack = () => {
    const Stack = createNativeStackNavigator ()
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Iniciar Sesion"
                component={LoginUser}
            />
        </Stack.Navigator>
    )
}
export default LoginUserStack