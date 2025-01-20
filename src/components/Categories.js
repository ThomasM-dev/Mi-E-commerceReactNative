import { StyleSheet, FlatList, View } from 'react-native';
import { colors } from '../globals/colors';
import ItemCategory from './ItemCategory';
import { useNavigation } from '@react-navigation/native';
import { useGetCategoryQuery } from '../services/ApiMyShop';
import { useState } from 'react';

const Categories = () => {
  const navigation = useNavigation();
  const { data: categorias, isSuccess } = useGetCategoryQuery();

  const [categorySelected, setCategorySelected] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleCategorySelected = (category) => {
    setCategorySelected(category.category);
    setCategoryId(category.id);
    navigation.navigate('ListProductCategory', {
      categorySelected: category.category,
      categoryId: category.id,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCategory
            category={item}
            onPress={() => handleCategorySelected(item)}
          />
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
