import { StyleSheet, FlatList, View } from "react-native";
import { useState } from "react";
import data from "../data/products.json";
import { colors } from "../globals/colors";
import ItemCategory from "./ItemCategory";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import ListProductCategory from "../screens/ListProductCategory";

const Categories = () => {
    const navigation = useNavigation ()
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryFiltered, setCategoryFiltered] = useState([]);        

    const handleCategorySelected = (category) => {        
        setSelectedCategory(category.category);        
        const filteredCategory = data.products.find((c) => c.category === category.category)?.items || [];
        setCategoryFiltered(filteredCategory);
        navigation.navigate("ListProductCategory", {categoryFiltered})
    };

    return (
        <View style={styles.container}>
            <Header title={"Categorias"}/>
            <FlatList
                data={data.products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ItemCategory category={item} onPress={() => handleCategorySelected(item)} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        marginTop: 10,
        flex: 1,
    },
});

export default Categories;
