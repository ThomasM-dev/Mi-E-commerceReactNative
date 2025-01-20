import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { colors } from '../globals/colors';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import EmptyCart from '../components/EmptyCart';
import { removeItemToCart } from '../store/slices/cartSlice';

const Cart = () => {
  const productCart = useSelector((state) => state.cartSlice.value.cart);
  const totalCart = useSelector((state) => state.cartSlice.value.total);
  const dispatch = useDispatch();

  const handleClickItemRemove = (item) => {
    dispatch(removeItemToCart(item));
  };

  if (productCart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productCart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCart}>
            <Image
              style={styles.imageProduct}
              source={{ uri: item.imageUrl }}
            />
            <View style={styles.containerText}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.count}>Cantidad: {item.count}</Text>
              <Text style={styles.price}>
                Precio: ${item.productxCount} ARS
              </Text>
            </View>
            <View style={styles.containerRemoveItem}>
              <Pressable onPress={() => handleClickItemRemove(item)}>
                <Ionicons name="trash" size={24} color={colors.red} />
              </Pressable>
            </View>
          </View>
        )}
      />
      <View style={styles.containerButton}>
        <Text style={styles.priceTotal}>Total: ${totalCart} ARS</Text>
        <Pressable style={styles.btnFinish}>
          <Text style={styles.btnText}>Finalizar Compra</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 50,
    width: '100%',
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
  productCart: {
    marginTop: 25,
    width: '90%',
    marginBottom: '5%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
  },
  imageProduct: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  containerText: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  count: {
    color: colors.black,
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.red,
    marginTop: 15,
    textAlign: 'center',
  },
  btnFinish: {
    backgroundColor: colors.red,
    paddingVertical: 15,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 3,
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  containerRemoveItem: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  containerButton: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
});

export default Cart;
