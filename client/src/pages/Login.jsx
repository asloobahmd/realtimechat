import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import RegisterForm from "@/components/forms/RegisterForm";
import LoginForm from "@/components/forms/LoginForm";

const Register = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-2 w-full px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
          Login
        </h2>
        <LoginForm />
        <div className="flex justify-center gap-x-2">
          <p className="text-center ">Don't have an account?</p>
          <Link
            to={"/register"}
            className="block cursor-pointer font-medium text-sky-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
