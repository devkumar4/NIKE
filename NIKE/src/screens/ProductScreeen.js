// import { useNavigation } from '@react-navigation/native';
import { Text, ActivityIndicator } from 'react-native';
import { StyleSheet, Image, FlatList, Pressable, View, TouchableOpacity } from 'react-native';
// import products from '../../assets/Asset Bundle/Asset Bundle/code/data/products';
import { useSelector, useDispatch } from 'react-redux'
import { productSlice } from '../store/ProductSlice';
import { useGetProductsQuery } from '../store/apiSlice';

const ProductsScreen = ({ navigation }) => {
    // const products = useSelector(state => state.products.products)
    const dispatch = useDispatch()
    const { error, data, isLoading } = useGetProductsQuery();
    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error fetching products: {error.error}</Text>;
    }

    const products = data.data;
    return (
        <View>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            // dispatch(productSlice.actions.setSelectedProduct(item.id))
                            navigation.navigate('Product Details', { id: item._id });
                        }}
                        style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </TouchableOpacity>
                )}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: '50%',
        padding: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
});

export default ProductsScreen;
