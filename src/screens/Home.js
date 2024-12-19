import { StyleSheet, View } from 'react-native';
import Categories from '../components/Categories';
import Header from '../components/Header';
import ListProductCategory from '../components/ListProductCategory';
import data from '../data/products.json'
import { colors } from '../globals/colors';
export default function Home() {
return (
    <View style={styles.container}>
        <Header title={"Categorias"}/>
        <ListProductCategory categoryFiltered={data.products[4].items}/> 
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
});

