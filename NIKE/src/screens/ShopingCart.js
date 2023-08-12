import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React from 'react';
// import cart from '../../assets/Asset Bundle/Asset Bundle/code/data/cart';
import CartListItem from '../components/CartListItem';
import { useDispatch, useSelector } from "react-redux"
import { selectDeliveryPrice, selectSubtotal, selectTotal, cartSlice } from '../store/CartSlice';
import { useCreateOrderMutation, useCreatePaymentIntentMutation } from '../store/apiSlice';
import { useStripe } from '@stripe/stripe-react-native';

const ShopingCartTotals = () => {
    const subtotal = useSelector(selectSubtotal)
    const deliveryFee = useSelector(selectDeliveryPrice)
    const Total = useSelector(selectTotal)
    return (

        <View style={styles.totalsContainer}>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>{subtotal} $</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery</Text>
                <Text style={styles.text}>{deliveryFee} $</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textBold}>Total</Text>
                <Text style={styles.textBold}>{Total} US$</Text>
            </View>
        </View>
    )
}

const ShopingCart = ({ navigation }) => {
    const subtotal = useSelector(selectSubtotal)
    const deliveryFee = useSelector(selectDeliveryPrice)
    const Total = useSelector(selectTotal)
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items)
    const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    // console.log(error, isLoading, data);
    const onCheckout = async () => {
        // 1. Create a payment intent
        const response = await createPaymentIntent({
            amount: Math.floor(Total * 100),
        });
        if (response.error) {
            Alert.alert('Something went wrong');
            return;
        }

        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'India Nike Store',
            paymentIntentClientSecret: response.data.paymentIntent,
        });
        if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert('Something went wrong');
            return;
        }

        // 3. Present the Payment Sheet from Stripe
        const paymentResponse = await presentPaymentSheet();

        if (paymentResponse.error) {
            Alert.alert(
                `Error code: ${paymentResponse.error.code}`,
                paymentResponse.error.message
            );
            return;
        }

        // 4. If payment ok -> create the order
        onCreateOrder();
    };

    const onCreateOrder = async () => {
        const result = await createOrder({
            items: cartItems,
            subtotal,
            deliveryFee,
            Total,
            customer: {
                name: "Dev Kumar",
                address: "My HOME",
                email: 'dev123@gmail.com',
            }


        })
        if (result.data?.status === "OK") {
            Alert.alert("Order has been submitted", `Your order reference is: ${result.data.data.ref}`);
            dispatch(cartSlice.actions.clear())
        };

    }


    return (

        <>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => {
                    return <CartListItem cartItem={item} />;
                }}
                ListFooterComponent={() => {
                    return (
                        <ShopingCartTotals />
                    );
                }}
            />
            <TouchableOpacity onPress={onCheckout} style={styles.button}>
                <Text style={styles.buttonText}>Checkout{isLoading && <ActivityIndicator />}</Text>
            </TouchableOpacity>
        </>

    );
};

export default ShopingCart;

const styles = StyleSheet.create({
    totalsContainer: {
        margin: 20,
        paddingTop: 10,
        borderColor: 'gainsboro',
        borderTopWidth: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    text: {
        fontSize: 16,
        color: 'gray',
    },
    textBold: {
        fontSize: 16,
        fontWeight: '500',
        color: "black"
    },

    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '95%',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
});
