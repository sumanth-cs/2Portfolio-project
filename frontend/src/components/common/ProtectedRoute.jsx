import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user || (requiredRole && !user.isAdmin)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;