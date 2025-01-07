import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartStack from './CartStack';
import OrdersStack from './OrdersStack';
import ShopHome from './ShopHome';
import { StyleSheet } from 'react-native';
import { colors } from '../globals/colors';
import TabBarIcon from '../components/TabBariCon';
import LoginUserStack from './LoginUserStack';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={ShopHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Carrito"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="shopping-cart" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Ordenes"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="list-ul" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Mi perfil"
        component={LoginUserStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="user" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.black,
    height: 60,
    borderColor: 'tranparent',
    justifyContent: 'center',
  },
});
export default TabNavigator;
