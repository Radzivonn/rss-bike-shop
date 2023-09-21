import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import AppRouter from 'router/AppRouter';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import { type ICart, type ICustomer } from 'types/types';
import { customersApi } from 'API/CustomersAPI';
import basketAPI from 'API/BasketAPI';

export const UserContext = createContext<{
  profileInfo?: ICustomer;
  isUserLoggedIn?: boolean;
  setIsUserLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  cart?: ICart;
  setCart?: React.Dispatch<React.SetStateAction<ICart | undefined>>;
}>({});

function App() {
  const [profileInfo, setProfileInfo] = useState<ICustomer>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [cart, setCart] = useState<ICart>();

  useEffect(() => {
    void getCustomerData();
    console.log('App effect');
  }, [isUserLoggedIn]);

  const getCustomerData = async () => {
    try {
      setProfileInfo(undefined);
      setCart(undefined);
      const customer = await customersApi.getCustomer();
      if ('id' in customer) {
        setProfileInfo(customer);
        setIsUserLoggedIn(true);
        console.log('there is user');
        setCart(await basketAPI.getActiveCart());
      }
    } catch (error) {
      console.log('Anonymous session started');
    }
  };

  return (
    <UserContext.Provider value={{ profileInfo, isUserLoggedIn, setIsUserLoggedIn, cart, setCart }}>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <ToastContainer autoClose={2000} hideProgressBar />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
