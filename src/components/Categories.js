import { StyleSheet, FlatList, View } from "react-native";
import { colors } from "../globals/colors";
import ItemCategory from "./ItemCategory";
import { useNavigation } from "@react-navigation/native";
import { useGetCategoryQuery } from "../services/ApiMyShop";

const Categories = () => {
    const {data: categorias,  error, isLoading} = useGetCategoryQuery ()
    
    const navigation = useNavigation()
    
    const handleCategorySelected = (category) => {
        navigation.navigate("ListProductCategory", {category})
    }
    
    return (
        <View style={styles.container}>
            <FlatList
                data={categorias}
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
