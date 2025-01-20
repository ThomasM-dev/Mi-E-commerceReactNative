import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../globals/colors';

const EmptyCart = () => {
  return (
    <View style={styles.containerEmptyCart}>
      <Text style={styles.emoji}>😞</Text>
      <Text style={styles.messageEmpty}>No hay productos en el carrito</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerEmptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: colors.white,
  },
  messageEmpty: {
    fontSize: 22,
    color: colors.gray,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 15,
  },
});

export default EmptyCart;
