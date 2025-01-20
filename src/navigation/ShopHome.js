import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';
import ListProductCategory from '../screens/ListProductCategory';
import { colors } from '../globals/colors';

const Stack = createNativeStackNavigator();

const ShopHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.black },
        headerTintColor: colors.red,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 30,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="ListProductCategory"
        component={ListProductCategory}
        options={({ route }) => ({
          title: route.params.categorySelected,
        })}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ route }) => ({
          title: route.params.product.title,
        })}
      />
    </Stack.Navigator>
  );
};

export default ShopHome;
