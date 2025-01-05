import { Text, View, Image, StyleSheet, Pressable, FlatList } from "react-native";
import { colors } from "../globals/colors";
import { useSelector } from "react-redux";

const Cart = () => {
    const productCart = useSelector((state) => state.cartSlice.value.cart);
    const totalCart = useSelector((state) => state.cartSlice.value.total);

    if (productCart.length === 0) {
        return (
        <View style={styles.container}>
            <Text>No hay productos en el carrito</Text>
        </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={productCart}
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => (  
                    <View style={styles.productCart}>
                        <Image style={styles.imageProduct} source={{ uri: item.imageUrl }} />
                        <View style={styles.containerText}>
                            <Text style={styles.name}>{item.title}</Text>
                            <Text style={styles.count}>Cantidad: {item.count}</Text>
                            <Text style={styles.price}>Precio: ${item.productxCount } ARS</Text>
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
        justifyContent: "space-between",
        marginTop: 50,
        width: "100%",
        backgroundColor: colors.white,
    },
    productCart: {
        height: "20%",
        width: "95%",
        flexWrap: "wrap",
        marginBottom: "5%",
        marginHorizontal: "5%",
        flexDirection: "row",  
    },
    imageProduct: {
        width: 110,
        height: 110,
        resizeMode: "cover",
    },
    containerText: {
        marginLeft: 20,
        justifyContent: "center",
    },
    name: {
        color: colors.black,
        fontSize: 23,
        marginBottom: 10,
    },
    count: {
        color: colors.black,
        fontSize: 17,
        marginBottom: 5,
    },
    price: {
        color: colors.black,
        fontSize: 17,
    },
    priceTotal: {
        fontSize: 23,
        fontWeight: "bold", 
        color: colors.red, 
        marginTop: 10,
        textAlign: "center", 
    
    },
    btnFinish: {
        backgroundColor: colors.red,
        paddingVertical: 15,
        borderRadius: 5,
        width: "90%",
        alignSelf: "center",
        marginTop: 10
    },
    btnText: {
        color: colors.white,
        fontSize: 20,
        textAlign: "center",
    },
    containerButton: {
        width: "100%",
        padding: 10,
        backgroundColor: colors.white,
    },
});

export default Cart;
