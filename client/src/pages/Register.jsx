import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import RegisterForm from "@/components/forms/RegisterForm";

const Register = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-2 w-full px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
          Register
        </h2>
        <RegisterForm />
        <div className="flex justify-center gap-x-2">
          <p className="text-center ">Already have an account?</p>
          <Link
            to={"/login"}
            className="block cursor-pointer font-medium text-sky-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
