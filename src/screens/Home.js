import { StyleSheet, View,  } from 'react-native';
import Categories from '../components/Categories';
import Header from '../components/Header';
import { colors } from '../globals/colors';
import ButtonsSearch from '../components/ButtonsSearch';
import Search from '../components/Search';
export default function Home() {
return (
    <View style={styles.container}>
        <Header title={"Categorias"}/>
        {/* <Categories/> */}
        <Search/>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
});

