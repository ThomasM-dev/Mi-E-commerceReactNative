import { StyleSheet, View,  } from 'react-native';
import { colors } from '../globals/colors';
import ProductDetail from './ProductDetail';

export default function Home() {
    
return (
    <View style={styles.container}>
        {/* <Categories/> */}
        <ProductDetail/>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
});

