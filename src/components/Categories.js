import { StyleSheet, FlatList, View } from "react-native";
import data from "../data/products.json";
import { colors } from "../globals/colors";
import ItemCategory from "./ItemCategory";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
    const navigation = useNavigation ()
    const handleCategorySelected = (category) => {
        const filteredCategory = data.products.find((c) => c.category === category.category)?.items || [];        
        if (filteredCategory.length > 0) {
            navigation.navigate("ListProductCategory", { categoryFiltered: filteredCategory });
        }
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
