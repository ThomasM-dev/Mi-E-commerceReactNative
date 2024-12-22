import { StyleSheet, View,  } from 'react-native';
import Header from '../components/Header';
import { colors } from '../globals/colors';
import ListCategory from './ListCategory';
import Categories from '../components/Categories'

export default function Home() {
return (
    <View style={styles.container}>
        {/* <Categories/>  */}
        <ListCategory/> 
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
});

