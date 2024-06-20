import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";

const App = () => {
  const router = Routes();
  return (
    <div className="w-full h-[calc(100vh-80px)]">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
