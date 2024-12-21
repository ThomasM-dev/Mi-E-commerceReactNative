import { StyleSheet, FlatList, View } from "react-native";
import { useState } from "react";
import data from "../data/products.json";
import { colors } from "../globals/colors";
import ItemCategory from "./ItemCategory";
import ListProductCategory from "./ListProductCategory"; 

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryFiltered, setCategoryFiltered] = useState([]);        

    const handleCategorySelected = (category) => {
        setSelectedCategory(category.category);        
        const filteredCategory = data.products.find((c) => c.category === category.category)?.items || [];
        setCategoryFiltered(filteredCategory);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data.products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ItemCategory category={item} onPress={() => handleCategorySelected(item)} />
                )}
            />
                <ListProductCategory categoryFiltered={categoryFiltered}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        justifyContent: "space-around",
        marginTop: 10,
        flex: 1,
    },
});

export default Categories;
