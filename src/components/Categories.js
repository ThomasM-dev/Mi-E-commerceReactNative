import { StyleSheet, FlatList, View, Text } from 'react-native';
import { colors } from '../globals/colors';
import ItemCategory from './ItemCategory';
import { useNavigation } from '@react-navigation/native';
import { useGetCategoryQuery } from '../services/ApiMyShop';
import Spinner from './Spinner';

const Categories = () => {
  const navigation = useNavigation();
  const {
    data: categorias,
    isLoading,
    error,
  } = useGetCategoryQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Ocurrió un error al cargar las categorías. Por favor, intenta
          nuevamente.
        </Text>
      </View>
    );
  }

  const handleCategorySelected = (category) => {
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
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: colors.red,
    textAlign: 'center',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Categories;
