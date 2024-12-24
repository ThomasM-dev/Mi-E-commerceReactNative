import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import Orders from '../screens/Orders';
import { NavigationContainer } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

const TabsNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarStyle: {backgroundColor: "black"},
                animation: "shift"
            }}
            >
                <Tab.Screen 
                name='Carrito' 
                component={Cart}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="shopping-cart" size={size} color={color} />
                    )
                }}
                />
                <Tab.Screen 
                name='Ordenes' 
                component={Orders}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Feather name="box" size={size} color={color} />
                    )
                }}
                />
        </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabsNavigator