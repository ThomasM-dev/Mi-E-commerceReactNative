import { FlatList, StyleSheet, View, Text, Image } from "react-native";
import Productos from "../data/Orden.json";
import { colors } from "../globals/colors";

const Orders = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={Productos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.containerOrder}>
                        <FlatList
                            data={item.productos}
                            keyExtractor={(producto) => producto.nombre}
                            horizontal
                            renderItem={({ item: producto }) => (
                                <View style={styles.containerImage}>
                                    <Image source={{ uri: producto.imagen }} style={styles.imageItemOrder} />
                                </View>
                            )}
                        />
                        <View style={styles.containerText}>
                            <Text style={styles.textBold}>Número de orden #{item.id}</Text>
                            <Text>Fecha de orden: {new Date(item.fecha * 1000).toLocaleDateString()}</Text>
                            <Text>Estado del Pedido: {item.estado}</Text>
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
        borderWidth: 1
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
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
});

export default Orders;
