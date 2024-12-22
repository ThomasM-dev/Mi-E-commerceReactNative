import { View, Image, StyleSheet, Text } from "react-native";
import data from "../data/products.json"

const ProductDetail = ({ product }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.imageProduct} source={{ uri: data.imageUrl}} />
            <View>
                <Text>{data.title}</Text>
                <Text>{data.description}</Text>
                <Text>{data.price }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageProduct: {
        width: 50,
        height: 50
    }
})
export default ProductDetail;