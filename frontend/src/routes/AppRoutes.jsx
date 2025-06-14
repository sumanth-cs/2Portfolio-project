// frontend/src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Admin from '../pages/Admin';
import PortfolioPage from '../pages/PortfolioPage';
import ProtectedRoute from '../components/common/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/portfolio/:userId" element={<PortfolioPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;