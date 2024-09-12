import './App.css';
import Header from './Header';
import Checkout from './Checkout';
import Home from './Home';
import Login from './Login';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { useEffect } from'react';
import { auth } from './firebase'; 
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe("pk_test_51PxZc5Ept6YNzKxjGAaFXR4w22CaTeWyvDJK3Ro7cpz0RnM9QgDEMYPV2pY8Fp40WLnLhZWHbhSmltiirbQXDWqJ00dv8ftxrm");
import Orders from './orders';




function App() {
  const [{},dispatch]= useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: 'SET_USER', user: authUser });
      } else {
        dispatch({ type: 'SET_USER', user: null });
      }
    });

    return () => unsubscribe();
  }, []);




  return (
    <BrowserRouter>
      <div className='app'>
        <HeaderWrapper />
        <ErrorBoundary>
          <Routes>
            <Route path='/Payment' element={<Elements stripe={promise}><Payment /></Elements>} />
            <Route path='/logIn' element={<Login />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/' element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  const showHeader = location.pathname !== '/LogIn' && location.pathname !== '/orders';

  return (
    <>
      {showHeader && <Header />}
    </>
  );
}

export default App;
