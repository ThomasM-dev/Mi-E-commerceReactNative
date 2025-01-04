import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ItemProduct from "../components/ItemProduct";
import Search from "../components/Search";
import { colors } from "../globals/colors";
import { useGetProductsByCategoryQuery } from "../services/ApiMyShop";

const ListProductCategory = ({ route }) => {
  const { category } = route.params;
  const categoryText = category.category;

  // Consulta a la API para obtener los productos por categoría
  const { data: categoryByProducts, error, isSuccess } = useGetProductsByCategoryQuery(categoryText);

  // Estado para almacenar los productos filtrados
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [keywords, setKeywords] = useState("");

  // Efecto para actualizar los productos cuando los datos sean cargados con éxito
  useEffect(() => {
    if (isSuccess && categoryByProducts) {
      // Convierte los objetos de productos en un array
      setProductsFiltered(Object.values(categoryByProducts));
    }
  }, [categoryByProducts, isSuccess]);

  // Filtro de productos basado en las palabras clave
  useEffect(() => {
    if (keywords) {
      const filteredProducts = productsFiltered.filter((product) =>
        product.title.toLowerCase().includes(keywords.toLowerCase())
      );
      setProductsFiltered(filteredProducts);
    } else {
      // Restaurar la lista original de productos cuando no haya palabra clave
      if (isSuccess && categoryByProducts) {
        setProductsFiltered(Object.values(categoryByProducts));
      }
    }
  }, [keywords, categoryByProducts, isSuccess, productsFiltered]);

  return (
    <View style={styles.container}>
      <Search onChangeKeyword={(t) => setKeywords(t)} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={productsFiltered}
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
