// App.tsx
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="products/createProduct" element={<CreateProducts />} />
          <Route path="coupons" element={<Coupons />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
