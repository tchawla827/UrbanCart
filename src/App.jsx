import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import ProductDisplay from './screens/ProductDisplay';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetails from './screens/ProductDetails';
import ShoppingCart from './screens/ShoppingCart';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Main from './screens/Main';
import { Login } from './screens/login';
import { SignUp } from './screens/SignUp';
import ProtectedRoute from './screens/protected_route/ProtectedRoute';
import { auth } from './firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loginUser, userState } from './redux/slices/user';
import { Checkout } from './screens/Checkout';
import { Thankyou } from './screens/Thankyou';
import Contact from './screens/Contact';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = () => {
    toast.success("Item added to cart successfully", {
      containerId: "AddToCart"
    });
  }
  const categoryAdded = () => {
    toast.success("Category Added to your View! ", {
      containerId: "CategoryAdded"
    });
  }
  const categoryRemoved = () => {
    toast.error("Category Removed from your View! ", {
      containerId: "CategoryRemoved"
    });
  }
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      dispatch(userState(currentUser ? true : false))
      dispatch(userState({ isLoggedIn : currentUser ? true : false, data : currentUser.providerData}))
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/page"
          element={
            <>
              <Navbar />
              <ProductDisplay
                categoryRemoved={categoryRemoved}
                categoryAdded={categoryAdded}
                addToCart={addToCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/page/product_detail/:id"
          element={
            <>
              <Navbar />
              <ProductDetails
                addToCartToast={addToCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/page/cart"
          element={
            <>
              <Navbar />
              <ProtectedRoute
                component={ShoppingCart}
                user={user}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <ProtectedRoute
                component={Checkout}
                user={user}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout/:payment_id"
          element={
            <>
              <Navbar />
              <ProtectedRoute
                component={Thankyou}
                user={user}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <ProductDisplay
                categoryRemoved={categoryRemoved}
                categoryAdded={categoryAdded}
                addToCart={addToCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
              <Footer />
            </>
          }
        />
        {/* <Route path="/*" element={<Navigate to="/page/1" replace />} /> */}
      </Routes>
    </>
  )
}

export default App
