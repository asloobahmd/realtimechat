import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await login(userLoginData);
      setLoading(false);

      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <form className="mb-6" onSubmit={HandleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          name="username"
          className="px-4 py-3 w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-300"
          placeholder="Username"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          name="password"
          className="px-4 py-3 w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-300"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        isLoading={loading}
        className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Login
      </Button>
      <p className="text-red-500">{error ? error : ""}</p>
    </form>
  );
};

export default LoginForm;
