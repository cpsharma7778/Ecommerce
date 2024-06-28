 
import './App.css';
import Home from './Pages/Home'
import {    Routes, Route  } from 'react-router-dom';
import Product from './Pages/Product';
import AddProduct from './Pages/AddProduct';
import UpdateProduct from './Pages/UpdateProduct';
import Sign_in from './Auth/Sign_in';
import Sign_up from './Auth/Sign_up';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   <>
    
  <Routes>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/Product' element={<Product/>}/>
    <Route path='/AddProduct' element={<AddProduct/>}/>
    <Route path='/UpdateProduct'element={<UpdateProduct/>}/>
    <Route path='/'element={<Sign_in/>}/>
    <Route path='/Sign_up'element={<Sign_up/>}/>
    </Routes>
    <ToastContainer />
   </>
  );
}

export default App;
