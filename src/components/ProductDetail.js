import { View, Image, StyleSheet, Text, Pressable, Alert } from "react-native";
import { colors } from "../globals/colors";
import AntDesign from '@expo/vector-icons/AntDesign';

const ProductDetail = () => {
    const product = {
        "title": "Smartphone Pro Max",
        "description": "Un smartphone de última generación con pantalla OLED y batería de larga duración.",
        "price": 999.99,
        "imageUrl": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-m33-1.jpg"
    }
    
    return (
        <View style={styles.container}>
            <Image style={styles.imageProduct} source={{ uri: product.imageUrl}} />
            <View style={styles.containerText}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>${product.price } ARS</Text>
                <Pressable style={styles.buttonCart} onPress={() => Alert.alert("agregado correctamente")}>
                <Text style={styles.textButtonCart}>Agregar al Carrito <AntDesign name="shoppingcart" size={25} color="white" /></Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.brown
    },
    imageProduct: {
        width: "100%",
        height:500,
        justifyContent: "center"
    },
    containerText: {
        backgroundColor: colors.brown,
        width: "100%",
        height: 250,
    },
    title: {
        color: colors.white,
        fontSize: 30,
        textAlign: "center"
    },
    description: {
        color: colors.grey,
        fontSize: 25
    },
    price: {
        color: colors.white,
        fontSize: 20
    },
    buttonCart:{
        marginTop: 40,
        height: 50,
        width: "100%",
        backgroundColor: colors.red,
    },
    textButtonCart: {
        fontSize: 30,
        textAlign: "center",
        color: colors.white
    }
})
export default ProductDetail;