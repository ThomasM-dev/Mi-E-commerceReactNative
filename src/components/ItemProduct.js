import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { colors } from '../globals/colors';
import { useNavigation } from '@react-navigation/native';

const ItemProduct = ({ itemProducts }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate('ProductDetail', { product: itemProducts })
        }
      >
        <Image
          style={styles.imageProduct}
          source={{ uri: itemProducts.imageUrl }}
        />
        <View style={styles.containerText}>
          <Text style={styles.textTitle}>{itemProducts.title}</Text>
          <Text style={styles.stock}>Stock: {itemProducts.stock}</Text>
          <Text style={styles.textPrice}>
            Precio: ${itemProducts.price} ARS
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
    flex: 1,
  },
  imageProduct: {
    height: 250,
    width: 250,
  },
  containerText: {
    width: 250,
    padding: 15,
    color: colors.white,
    backgroundColor: colors.brown,
  },
  textTitle: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  stock: {
    color: colors.gray,
    fontSize: 17,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textPrice: {
    color: colors.white,
  },
});
export default ItemProduct;
