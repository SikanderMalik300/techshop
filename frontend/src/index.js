import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './store';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute'
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import MyOrderScreen from './screens/MyOrderScreen';
import ProfileScreen from './screens/ProfileScreen'
import MyOrdersScreen from './screens/MyOrdersScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route  path='/product/:id' element={<ProductScreen/>}/>
      <Route  path='/cart' element={<CartScreen/>}/>
      <Route  path='/signin' element={<LoginScreen/>}/>
      <Route  path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRoute />}>
         <Route path='/shipping' element={<ShippingScreen />} />
         <Route path='/payment' element={<PaymentScreen />} />
         <Route path='/profile' element={<ProfileScreen />} />
         <Route path='/myordersdata' element={<MyOrdersScreen />} />
         <Route path='/placeorder' element={<OrderScreen />} />
         <Route path='/myorder/:id' element={<MyOrderScreen />} />
      </Route>
      
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
      </Provider>
  </React.StrictMode>
);


