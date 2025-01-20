import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ItemProduct from '../components/ItemProduct';
import Search from '../components/Search';
import { colors } from '../globals/colors';
import { useGetProductsByCategoryQuery } from '../services/ApiMyShop';

const ListProductCategory = ({ route }) => {
  const { categorySelected, categoryId } = route.params;

  const { data, isSuccess } = useGetProductsByCategoryQuery(categorySelected);
  const [products, setProducts] = useState([]);
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setProducts(Object.values(data[categoryId].items));
    }
  }, [isSuccess, data, categoryId]);

  useEffect(() => {
    if (isSuccess) {
      const filteredProducts = Object.values(data[categoryId].items).filter(
        (product) =>
          product.title.toLowerCase().includes(keywords.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [keywords, isSuccess, data, categoryId]);

  return (
    <View style={styles.container}>
      <Search onChangeKeyword={(t) => setKeywords(t)} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={products}
        renderItem={({ item }) => <ItemProduct itemProducts={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

export default ListProductCategory;
