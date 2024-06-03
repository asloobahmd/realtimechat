import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";

const App = () => {
  const router = Routes();
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
