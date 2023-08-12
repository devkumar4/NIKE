import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProductsScreen from "./screens/ProductScreeen"
import ProductDetailsScreen from "./screens/ProductDetailsScreen"
import ShopingCart from "./screens/ShopingCart"
import { TouchableOpacity, Text } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import { selectNumberOfItems } from "./store/CartSlice"
import TrackOrder from "./screens/TrackOrder"


const Stack = createNativeStackNavigator()

const Navigation = ({ navigation }) => {
    const numberOfItems = useSelector(selectNumberOfItems)
    return (
        <NavigationContainer>

            {/* <ProductsScreen /> */}

            <Stack.Navigator screenOptions={{
                contentStyle: { backgroundColor: "white" },
                headerTitleAlign: 'center',


            }}>
                <Stack.Screen name="Products" component={ProductsScreen} options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate('Cart')}>
                            <FontAwesome5 name='shopping-cart' size={18} color="gray" />
                            <Text style={{ marginLeft: 5, fontWeight: '500', color: "grey" }}>{numberOfItems}</Text>
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate('Track Order')}>
                            <MaterialCommunityIcons name='truck-delivery' size={24} color="gray" />

                        </TouchableOpacity>
                    )
                })} />
                <Stack.Screen name="Product Details" component={ProductDetailsScreen} options={{
                    presentation: 'modal'
                }} />
                <Stack.Screen name="Cart" component={ShopingCart} />
                <Stack.Screen name="Track Order" component={TrackOrder} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation