import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ItemProduct from "./ItemProduct";
import Search from "./Search";

const ListProductCategory = ({ categoryFiltered }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [keywords, setKeyqwords] = useState("")
    
    useEffect(() => {
        setProductsFiltered(categoryFiltered);
    }, []);
    
    useEffect(() => {
        if (keywords) {
            return setProductsFiltered(productsFiltered.filter(product => product.title.includes(keywords)))
        }
        setProductsFiltered(categoryFiltered);
    }, [keywords])
    
    return (
        <View style={styles.container}>
            <Search  onChangeKeyword={(t) => setKeyqwords(t)} />
            <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={productsFiltered}
            renderItem={({item}) => (
                <ItemProduct itemProducts={item} />
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
