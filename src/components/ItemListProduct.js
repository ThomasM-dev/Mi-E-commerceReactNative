import { View, Text, Image, StyleSheet } from "react-native"
import { colors } from "../globals/colors"

const ItemListProduct = ({itemProduct}) => {
    return (
    <View style={styles.container}>
        <Image style={styles.imageProduct} source={{uri: itemProduct.imageUrl}} />
        <View style={styles.containerText}>
        <Text style={styles.textTitle}>{itemProduct.title}</Text>
        <Text style={styles.textDescription}>Descripcion: {itemProduct.description}</Text>
        <Text style={styles.textPrice}>Precio: ${itemProduct.price} ARS</Text>
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
    }
})
export default ItemListProduct

