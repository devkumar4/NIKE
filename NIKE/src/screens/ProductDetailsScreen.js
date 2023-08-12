import { Image, StyleSheet, FlatList, View, Text, useWindowDimensions, ScrollView, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartSlice } from '../store/CartSlice'
import { showToast } from '../components/Toast'
import { useGetProductQuery } from '../store/apiSlice'

const ProductDetailsScreen = ({ route }) => {
    const id = route.params.id;
    const { data, isLoading, error } = useGetProductQuery(id);
    const { width } = useWindowDimensions();
    // const product = useSelector((state) => state.products.selectedProduct)
    const dispatch = useDispatch();


    const addtocart = () => {
        dispatch(cartSlice.actions.addCartItem({ product }))
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error fetching products: {error.error}</Text>;
    }

    const product = data?.data


    return (
        <View>
            <ScrollView>
                <FlatList
                    data={product.images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
                <View style={{ padding: 20 }}>
                    {/* Title */}
                    <Text style={styles.title}>{product.name}</Text>

                    {/* Price */}
                    <Text style={styles.price}>${product.price}</Text>

                    {/* Description */}
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={addtocart || showToast('HELLo')} style={styles.button} >
                <Text style={styles.buttonText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginVertical: 10,
        color: "black"
    },
    price: {
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: 1.2,
        color: "black"
    },
    description: {
        marginVertical: 5,
        fontSize: 15,
        lineHeight: 30,
        fontWeight: '400',
        color: "grey"
    },

    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
})