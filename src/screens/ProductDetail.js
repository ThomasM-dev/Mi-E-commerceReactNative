import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [buttonText, setButtonText] = useState('Agregar al carrito');
  const [disableButton, setDisableButton] = useState(false);

  const handleAddCart = (product) => {
    if (count >= 1) {
      setButtonText('Producto agregado');
      setDisableButton(true);
      setTimeout(() => {
        setButtonText('Agregar al carrito');
        setDisableButton(false);
      }, 1000);
      const productxCount = product.price * count;
      const productWithCount = { ...product, count, productxCount };
      dispatch(addToCart(productWithCount));
    } else {
      alert('La cantidad debe ser al menos 1');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.counterContainer}>
        <TextInput
          style={styles.input}
          value={String(count)}
          onChangeText={(text) => setCount(Number(text))}
          keyboardType="numeric"
        />
        <Pressable
          style={[styles.button, disableButton && styles.buttonDisabled]}
          onPress={() => handleAddCart(product)}
          disabled={disableButton}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.brown,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: colors.primary,
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginVertical: 8,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.red,
    padding: 8,
    marginRight: 8,
    width: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.red,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: colors.blue,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProductDetail;
