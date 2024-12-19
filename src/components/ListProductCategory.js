import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ItemListProduct from "./ItemListProduct"
import { colors } from "../globals/colors";

const ListProductCategory = ({ categoryFiltered }) => {          
    const [productsFiltered, setProductsFiltered] = useState([]);
    useEffect(() => {
        setProductsFiltered(categoryFiltered);
    }, [categoryFiltered]);

    return (
            <FlatList
            contentContainerStyle={styles.container}
            keyExtractor={(item) => item.id.toString()}
            data={productsFiltered}
            renderItem={({item}) => (
                <ItemListProduct itemProduct={item} />
            )}
        />
    );
};

const styles = StyleSheet.create({})
export default ListProductCategory;
