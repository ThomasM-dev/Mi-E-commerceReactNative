import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ItemProduct from "../components/ItemProduct";
import Search from "../components/Search"
import { colors } from "../globals/colors";
import { useGetProductsByCategoryQuery } from "../services/ApiMyShop";

const ListProductCategory = ({ route }) => {
  const { categorySelected } = route.params 

  const { data, isSuccess, isError, isFetching } = useGetProductsByCategoryQuery(categorySelected)
  

    // const categoryText = category.category

    // const { data: categoryByProducts, error, isSuccess } = useGetProductsByCategoryQuery(categoryText)
    // const [productsFiltered, setProductsFiltered] = useState(Object.values(categoryByProducts));
    // const [keywords, setKeywords] = useState("")

    
    return (
        <View style={styles.container}>
            <Search onChangeKeyword={(t) => setKeywords(t)} />
            <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={productsFiltered}
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
