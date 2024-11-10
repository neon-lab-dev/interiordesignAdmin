// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/login";
import DashboardLayout from "./layout/layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          {/* <Route path="home" element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} /> */}
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
