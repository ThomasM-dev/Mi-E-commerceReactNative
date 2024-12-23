import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { colors } from "../globals/colors";
import AntDesign from '@expo/vector-icons/AntDesign';


const ProductDetail = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.imageProduct} source={{ uri: product.imageUrl}} />
            <View style={styles.containerText}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>$ {product.price} ARS</Text>
                <Pressable style={styles.buttonCart}> 
                    <Text style={styles.textCart}>Agregar al carrito <AntDesign name="shoppingcart" size={26} color="white" /></Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageProduct: {
        width: 450,
        height: 450,
    },
    containerText: {
        width: "100%",
        height: 250,
        backgroundColor: colors.brown
    },
    title: {
        color: colors.white,
        fontSize: 25,
        textAlign: "center"
    },
    description: {
        color: colors.grey,
        fontSize: 20
    },
    price: {
        color: colors.white,
        fontSize: 20
    },
    buttonCart: {
        marginTop: 3,
        height: 50,
        width: "100%",
        backgroundColor: colors.burgundy
    },
    textCart: {
        marginTop: 5,
        color: colors.white,
        fontSize: 25,
        textAlign: "center"
    }
})

export default ProductDetail;