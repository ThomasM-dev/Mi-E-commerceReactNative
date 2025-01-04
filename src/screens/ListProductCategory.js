import { use, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ItemProduct from "../components/ItemProduct";
import Search from "../components/Search"
import { colors } from "../globals/colors";
import { useGetProductsByCategoryQuery } from "../services/ApiMyShop";

const ListProductCategory = ({ route }) => {
    const { categorySelected } = route.params;
    const { data, isSuccess, isError, isFetching } = useGetProductsByCategoryQuery(categorySelected);
    const [products, setProducts] = useState([])

    useEffect(() =>{
        if (isSuccess) {
            console.log(setProducts(data[0].tems));
        }
    } , [isSuccess, data])

    // const { data: categoryByProducts, error, isSuccess } = useGetProductsByCategoryQuery(categoryText)
    // const [productsFiltered, setProductsFiltered] = useState(Object.values(categoryByProducts));
    // const [keywords, setKeywords] = useState("")

    
    return (
    <View style={styles.container}>
        <Search onChangeKeyword={(t) => setKeywords(t)} />  
            <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={products}
            renderItem={({ item }) => (
            <ItemProduct itemProducts={item}/>
        )}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
})
export default ListProductCategory;
