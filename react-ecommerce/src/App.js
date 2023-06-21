import React from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

const router = createBrowserRouter([
  { path: "/", element: <Home></Home> },
  { path: "/login", element: <LoginPage></LoginPage> },
  { path: "/signup", element: <SignupPage></SignupPage> },
  { path: "/cart", element: <CartPage></CartPage> },
  { path: "/product-detail", element: <ProductDetailPage></ProductDetailPage> },
  { path: "/checkout", element: <CheckoutPage></CheckoutPage> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
