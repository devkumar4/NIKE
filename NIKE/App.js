import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProductsScreen from './src/screens/ProductScreeen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ShopingCart from './src/screens/ShopingCart';
import Navigation from './src/Navigation';
import { Provider } from 'react-redux';
import { Store } from './src/store';
import { StripeProvider } from '@stripe/stripe-react-native';
const STRIPE_KEY = "pk_test_51MiYaMSGmOVP0oukEjTPz4Hvbmgt4X2EljXF1g2oN8vJQ3AnwR8JJyvvezc5w58HOHNGSf29d8kwADMyv5spsAmQ00u9rtucx8"

const App = () => {
  return (
    // <View styles={styles.container}>
    <Provider store={Store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <Navigation />
      </StripeProvider>
      <StatusBar style="auto" />
    </Provider>
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({

});
