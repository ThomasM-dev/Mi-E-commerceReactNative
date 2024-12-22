import { StyleSheet, View,  } from 'react-native';
import Header from '../components/Header';
import { colors } from '../globals/colors';
import ListCategory from './ListCategory';
import Categories from '../components/Categories'
import DetailProducts from './DetailProducts';
import data from "../data/products.json"

export default function Home() {
    
return (
    <View style={styles.container}>
        {/* <ListCategory/> */}
        <DetailProducts/>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
});

