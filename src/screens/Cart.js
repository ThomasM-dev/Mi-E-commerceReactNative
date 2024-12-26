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
            <Pressable style={styles.btnFinish}>
                <Text style={styles.btnText}>Finalizar Compra</Text>
        </Pressable>
    </View>
)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white

    },
    productCart: {
        height: 120,
        width: "100%",
        flexWrap: "wrap",
        marginTop: 20,
    },
    imageProduct: {
        width: 120,
        height: 120,
        resizeMode: "cover"
    },
    containerText: {
        marginLeft: 20
    },
    name: {
        color: colors.black,
        fontSize: 23,
        marginBottom: 20
    },
    quantity: {
        color: colors.black,
        fontSize: 17,
        marginBottom: 25
    },
    price: {
        color: colors.black,
        fontSize: 17,
    },
    btnFinish: {
        backgroundColor: colors.red,
        paddingVertical: 10,
    },
    btnText: {
        color: colors.white,
        fontSize: 20,
        textAlign: "center"
    }
})
export default Cart