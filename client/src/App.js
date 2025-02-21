import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage.js"
import About from "./Pages/About.js";
import Contact from "./Pages/Contact.js";
import Policy from "./Pages/Policy.js";
import Pagenotfound from "./Pages/PageNotFound.js";
import Register from "./Pages/Auth/Register.js";
import Login from "./Pages/Auth/Login.js";
import PrivateRoute from "./Components/Routes/Private.js";
import Dashboard from "./Pages/Users/DashBoard.js";
import ForgotPasssword from "./Pages/Auth/ForgotPassword.js";
import Orders from "./Pages/Users/Orders.js"
import Profile from "./Pages/Users/Profile.js";
import AdminRoute from "./Components/Routes/AdminRoutes.js";
import AdminDashboard from "./Pages/Admin/AdminDashboard.js";
import CreateCategory from "./Pages/Admin/CreateCategory.js"
import CreateProduct from "./Pages/Admin/CreateProduct.js"
import Users from "./Pages/Admin/User.js"
import Products from "./Pages/Admin/Products.js"
import UpdateProduct from "./Pages/Admin/UpdateProducts.js"
import Search from "./Pages/Search.js";
import ProductDetails from "./Pages/ProductDetails.js";
import Categories from "./Pages/category.js";
import CategoryProduct from "./Pages/categoryProduct.js";
import CartPage from "./Pages/CartPages.js";
import AdminOrders from "./Pages/Admin/AdminOrders.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;