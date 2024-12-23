import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ItemProduct from "../components/ItemProduct";
import { useRoute } from "@react-navigation/native";
import Search from "../components/Search"
const ListProductCategory = () => {
    const route = useRoute();
    const {categoryFiltered } = route.params;
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [keywords, setKeywords] = useState("")
    
    useEffect(() => {
        if (keywords) {
            const filteredProducts = categoryFiltered.filter(product => product.title.toLowerCase().includes(keywords.toLowerCase()));
            setProductsFiltered(filteredProducts);
        } else {
            setProductsFiltered(categoryFiltered);
        }
    }, [keywords, categoryFiltered]);


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
        flex: 1
    }
})
export default ListProductCategory;
