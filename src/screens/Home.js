import { StyleSheet, View,  } from 'react-native';
import Categories from '../components/Categories';
import Header from '../components/Header';
import { colors } from '../globals/colors';
export default function Home() {
return (
    <View style={styles.container}>
        <Header title={"Categorias"} />
         <Categories/>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
});

