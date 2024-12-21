import { View, Text, Image, StyleSheet } from "react-native"
import { colors } from "../globals/colors"

const ItemProduct = ({itemProducts}) => {
    return (
    <View style={styles.container}>
        <Image style={styles.imageProduct} source={{uri: itemProducts.imageUrl}} />
        <View style={styles.containerText}>
        <Text style={styles.textTitle}>{itemProducts.title}</Text>
        <Text style={styles.textDescription}>Descripcion: {itemProducts.description}</Text>
        <Text style={styles.textPrice}>Precio: ${itemProducts.price} ARS</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        marginBottom: 20,
        alignItems: "center",
        flex: 1,
    },
    imageProduct: {
        height: 250,
        width: 250,
    },
    containerText: {
        width: 250,
        padding: 15,
        color: colors.white,
        backgroundColor: colors.brown,
    },
    textTitle: {
        textAlign: "center",
        color: colors.white,
        fontWeight: "bold",
        fontSize: 20
    },
    textDescription: {
        color: colors.gray,
        fontWeight: "bold"
    },
    textPrice: {
        color: colors.white
    }
})
export default ItemProduct

