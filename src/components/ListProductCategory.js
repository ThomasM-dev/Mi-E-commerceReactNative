import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ItemProduct from "./ItemProduct";
import Search from "./Search";
import Header from "./Header";
import { colors } from "../globals/colors";

const ListProductCategory = ({ categoryFiltered }) => {
    
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [keywords, setKeyqwords] = useState("")
    
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
            <Search onChangeKeyword={(t) => setKeyqwords(t)} />
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
