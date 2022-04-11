import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FirstPage from './FirstPage';
import AdministratorLogin from './AdministratorLogin';
import CustomerLogin from './CustomerLogin';
import AdministratorPage from './AdministratorPage';
import AddRestaurant from './AddRestaurant';
import CreateMenuPage from './CreateMenuPage';
import ViewMenu from './ViewMenu';
import CustomerPage from './CustomerPage';
import ViewResturants from './ViewRestaurants';
import CustomerViewMenu from './CustomerViewMenu';
import AdminViewOrders from './AdminViewOrders';
import AdminFilterOrders from './AdminFilterOrders';
import CustomerViewOrders from './CustomerViewOrders';


ReactDOM.render(
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<FirstPage />}/>
          <Route exact path="/register" element={<App />}/>
          <Route exact path="/administrator/login" element={<AdministratorLogin />}/>
          <Route exact path="/customer/login" element={<CustomerLogin />}/>
          <Route exact path="/administrator/homepage" element={<AdministratorPage />}/>
          <Route exact path="/administrator/addRestaurant" element={<AddRestaurant />}/>
          <Route exact path="/administrator/createMenu" element={<CreateMenuPage />}/>
          <Route exact path="/administrator/viewMenu" element={<ViewMenu />}/>
          <Route exact path="/customer/homepage" element={<CustomerPage />}/>
          <Route exact path="/customer/viewRestaurants" element={<ViewResturants />}/>
          <Route exact path="/customer/viewMenu" element={<CustomerViewMenu />}/>
          <Route exact path="/administrator/viewOrders" element={<AdminViewOrders />}/>
          <Route exact path="/administrator/filterOrders" element={<AdminFilterOrders />}/>
          <Route exact path="/customer/viewOrders" element={<CustomerViewOrders />}/>
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
