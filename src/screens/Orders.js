import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetCartQuery } from '../services/userCartApi';
import { colors } from '../globals/colors';

const Orders = () => {
  const localId = useSelector((state) => state.user.localId);
  const { data, error, isLoading } = useGetCartQuery(localId);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      setOrders(Object.values(data));
    }
  }, [data]);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Hubo un error al cargar las órdenes.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.purchaseDate}
        renderItem={({ item }) => (
          <View style={styles.containerOrder}>
            <FlatList
              data={item.products}
              keyExtractor={(producto) => producto.id.toString()}
              horizontal
              renderItem={({ item: producto }) => (
                <View style={styles.containerImage}>
                  <Image
                    source={{ uri: producto.imageUrl }}
                    style={styles.imageItemOrder}
                  />
                </View>
              )}
            />
            <View style={styles.containerText}>
              <Text style={styles.textBold}>
                Número de orden #{item.purchaseDate}
              </Text>
              <Text>Precio total de la compra ${item.totalPrice}</Text>
              <Text>
                Fecha de orden:{' '}
                {new Date(item.purchaseDate).toLocaleDateString()}{' '}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 20,
  },
  containerOrder: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    borderColor: colors.black,
    borderWidth: 1,
  },
  containerImage: {
    marginRight: 10,
  },
  imageItemOrder: {
    height: 70,
    width: 70,
    borderRadius: 8,
    borderWidth: 1,
  },
  containerText: {
    marginTop: 10,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Orders;
