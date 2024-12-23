import { Text, Image, Pressable, StyleSheet } from "react-native";
import { colors } from "../globals/colors";

const ItemCategory = ({ category, onPress }) => {       
    return (
        <Pressable style={styles.container} onPress={() => onPress(category)}>
            <Image style={styles.categoryImage} source={{ uri: category.image }} />
            <Text style={styles.categoryText}>{category.category}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: "100%",
        backgroundColor: colors.black,
        flex: 1
    },
    categoryImage: {
        width: "100%",
        height: 150,
        position: "relative",
        opacity: 0.4,
        overflow: "hidden",
    },
    categoryText: {
        position: "absolute",
        color: colors.white,
        top: "45%",
        left: "45%",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
});

export default ItemCategory;
