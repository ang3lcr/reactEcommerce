import { useState, useEffect } from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import MyNavBar from './components/MyNavBar'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/products.slice';


function App() {



const isLoading = useSelector(state => state.isLoading)
const dispatch = useDispatch()


useEffect(() => {
  dispatch(getProductsThunk())
}, [])



  return (
  <HashRouter>
    <MyNavBar />
    {isLoading && <LoadingScreen />}
    <Routes>
      <Route path="/" element={<Home />}/> //All products
      <Route path="/product/:id" element={<ProductDetails />}/> //ProductDetails
      <Route path="/login" element={<Login />}/> //Login
      <Route path="/purchases/" element={<Purchases />}/> //Favorites
    </Routes>
  </HashRouter>
  )
}

export default App
