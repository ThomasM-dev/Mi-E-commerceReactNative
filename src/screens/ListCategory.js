import { View, StyleSheet } from "react-native"
import Header from "../components/Header"
import data from "../data/products.json"
import ListProductCategory from "../components/ListProductCategory"

const ListCategory = () => {
    return (
        <View style={styles.container}>
            <ListProductCategory/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default ListCategory