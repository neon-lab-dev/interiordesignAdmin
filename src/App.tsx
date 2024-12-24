import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/login";
import DashboardLayout from "./layout/layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import Users from "./pages/Users/Users";
import Products from "./pages/Products/Products";
import CreateProducts from "./pages/Products/CreatrProducts";
import Coupons from "./pages/Coupons/Coupons";
import UpdateProduct from "./pages/Products/UpdateProduct";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create-product" element={<CreateProducts />} />
          <Route path="products/update-product/:productId" element={<UpdateProduct />} />
          <Route path="coupons" element={<Coupons />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
