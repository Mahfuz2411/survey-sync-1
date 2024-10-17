import {
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from '../layout/AppLayout';
import Login from "../auth/Login";
import Register from "../auth/Register";
import Error from "../pages/Error";
import Home from "../pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/register',
        element: <Register />
      },
    ]
  }
]);

export default router;