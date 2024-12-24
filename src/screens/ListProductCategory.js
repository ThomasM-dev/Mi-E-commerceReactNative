import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ItemProduct from "../components/ItemProduct";
import Search from "../components/Search"
import { colors } from "../globals/colors";
const ListProductCategory = ({route}) => {
    const {categoryFiltered, category} = route.params
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
        flex: 1,
        backgroundColor: colors.black
    }
})
export default ListProductCategory;
