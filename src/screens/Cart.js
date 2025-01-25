import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAddCartMutation } from '../services/userCartApi';
import { removeItemToCart, clearCart } from '../store/slices/cartSlice';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from 'react-native';
import { colors } from '../globals/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import EmptyCartOrders from '../components/EmptyCartOrders';

const Cart = () => {
  const localId = useSelector((state) => state.user.localId);
  const productCart = useSelector((state) => state.cart.value.cart);
  const totalCart = useSelector((state) => state.cart.value.total);
  const dispatch = useDispatch();

  const [addCart, { isLoading, isSuccess, isError }] = useAddCartMutation();

  const handleClickItemRemove = (item) => {
    dispatch(removeItemToCart(item));
  };

  if (productCart.length === 0)
    return <EmptyCartOrders>No hay productos en el carrito</EmptyCartOrders>;

  const handleFinishPurchase = async () => {
    if (productCart.length === 0) return;

    const cartData = {
      products: productCart.map((item) => ({
        id: item.id,
        title: item.title,
        count: item.count,
        totalPrice: item.productxCount,
        imageUrl: item.imageUrl,
      })),
      totalQuantity: productCart.reduce((total, item) => total + item.count, 0),
      totalPrice: totalCart,
      purchaseDate: Date.now(),
    };

    try {
      await addCart({ localId, cartData }).unwrap();
      showMessage({
        message: ' Compra realizada correctamente',
        type: 'success', // Tipos predefinidos: "success", "warning", "danger", "info"
        icon: 'success',
      });
      dispatch(clearCart());
    } catch (error) {
      console.error('Error al finalizar compra:', error);
      alert('Hubo un error al guardar tu carrito.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productCart}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.count}>Cantidad: {item.count}</Text>
              <Text style={styles.price}>
                Precio total: ${item.productxCount}
              </Text>
            </View>
            <Pressable
              style={styles.removeButton}
              onPress={() => handleClickItemRemove(item)}
            >
              <Text style={styles.removeButtonText}>Eliminar</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.title}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${totalCart}</Text>
        <Pressable style={styles.purchaseButton} onPress={handleFinishPurchase}>
          <Text style={styles.purchaseButtonText}>Finalizar Compra</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: colors.red,
  },
  removeButton: {
    backgroundColor: colors.red,
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  purchaseButton: {
    backgroundColor: colors.black,
    padding: 16,
    borderRadius: 8,
  },
  purchaseButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;
