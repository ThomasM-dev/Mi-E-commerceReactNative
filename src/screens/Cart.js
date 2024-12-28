import { Text, View, Image, StyleSheet, Pressable } from "react-native"
import { colors } from "../globals/colors";
const Cart = () => {
    const productCart = {
        name: "Espresso Coffee Maker",
        quantity: 1, 
        image: "https://m.media-amazon.com/images/I/81cpBt-u+5L.jpg", 
        price: 120.99 
      };
      
    return (
    <View style={styles.container}>
    <View style={styles.productCart}>
        <Image style={styles.imageProduct}
            source={{ uri: productCart.image }} />
        <View style={styles.containerText}>
            <Text style={styles.name}>{productCart.name}</Text>
            <Text style={styles.quantity}>Cantidad:  {productCart.quantity}</Text>
            <Text style={styles.price}>Precio: ${productCart.price } ARS</Text>
        </View>
            </View>
            <View style={styles.containerButton}>
            <Pressable style={styles.btnFinish}>
                <Text style={styles.btnText}>Finalizar Compra</Text>
        </Pressable>
            </View>
    </View>
)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between", 
        marginTop: 50,
        width: "100%",
        backgroundColor: colors.white,
    },
    productCart: {
        height: 110,
        width: "100%",
        flexWrap: "wrap",
        marginTop: 20,
    },
    imageProduct: {
        width: 110,
        height: 110,
        resizeMode: "cover",
    },
    containerText: {
        marginLeft: 20,
    },
    name: {
        color: colors.black,
        fontSize: 23,
        marginBottom: 20,
    },
    quantity: {
        color: colors.black,
        fontSize: 17,
        marginBottom: 25,
    },
    price: {
        color: colors.black,
        fontSize: 17,
    },
    btnFinish: {
        backgroundColor: colors.red,
        paddingVertical: 15,
        borderRadius: 5,
        width: "90%",
        alignSelf: "center",
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
})

export default Cart