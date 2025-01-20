import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { colors } from '../globals/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { useState } from 'react';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [buttonText, setButtonText] = useState('Agregar al carrito');
  const [disableButtom, setDisableButtom] = useState(false);

  const handleAddCart = (product) => {
    if (count >= 1) {
      setButtonText('Producto agregado');
      setDisableButtom(true);
      setTimeout(() => {
        setButtonText('Agregar al carrito');
        setDisableButtom(false);
      }, 1000);
      const productxCount = product.price * count;
      const productWithCount = { ...product, count, productxCount };
      dispatch(addToCart(productWithCount));
    } else {
      alert('Error', 'Ingrese al menos 1');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageProduct} source={{ uri: product.imageUrl }} />
      <View style={styles.containerText}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price} ARS</Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputCount}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
            placeholderTextColor={colors.white}
            value={count.toString()}
            onChangeText={(text) => setCount(Number(text))}
          />
        </View>
        <Pressable
          style={[
            styles.buttonCart,
            disableButtom && { backgroundColor: colors.black },
          ]}
          disabled={disableButtom}
          onPress={() => handleAddCart(product)}
        >
          <Text style={styles.textButtonCart}>
            {buttonText}
            <AntDesign name="shoppingcart" size={25} color="white" />
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brown,
  },
  imageProduct: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
    backgroundColor: colors.white,
  },
  containerText: {
    width: '100%',
    height: 250,
  },
  title: {
    color: colors.white,
    fontSize: 25,
    textAlign: 'center',
  },
  description: {
    color: colors.grey,
    fontSize: 25,
    margin: 20,
  },
  price: {
    color: colors.white,
    fontSize: 20,
    margin: 20,
  },
  containerInput: {
    width: '70%',
    height: '20%',
    alignSelf: 'center',
  },
  inputCount: {
    width: '100%',
    height: '100%',
    color: colors.white,
    fontSize: 20,
    borderWidth: 1,
    borderColor: colors.white,
  },
  buttonCart: {
    marginTop: 40,
    height: 50,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: colors.red,
    justifyContent: 'center',
  },
  textButtonCart: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.white,
  },
});
export default ProductDetail;
