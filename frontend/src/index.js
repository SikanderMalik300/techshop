import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './store';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route  path='/product/:id' element={<ProductScreen/>}/>
      <Route  path='/cart' element={<CartScreen/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);


