import { View } from "react-native"
import Header from "../components/Header"
import ItemListProduct from "../components/ItemListProduct"
const ItemListCategory = ({}) => {
    return (
        <View>
        <Header tile={category}/> 
        <ItemListProduct categoryFiltered={data.products[4].items}/> 
        </View>
    )
}

export default ItemListCategory