import { AuthContext } from "@/context/AuthContext";
import DefaultLayout from "@/layout/DefaultLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { useContext } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

const Routes = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return router;
};

export default Routes;
