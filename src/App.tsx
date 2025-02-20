import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/components/Root";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import PropertyDetails from "@/pages/PropertyDetails";
import AddProperty from "@/pages/AddProperty";
import EditProperty from "@/pages/EditProperty";
import Buy from "@/pages/Buy";
import Rent from "@/pages/Rent";
import Sell from "@/pages/Sell";
import Profile from "@/pages/Profile";
import Messages from "@/pages/Messages";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "/property/:id",
        element: <PropertyDetails />,
      },
      {
        path: "/add-property",
        element: <AddProperty />,
      },
      {
        path: "/edit-property/:id",
        element: <EditProperty />,
      },
      {
        path: "/buy",
        element: <Buy />,
      },
      {
        path: "/rent",
        element: <Rent />,
      },
      {
        path: "/sell",
        element: <Sell />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}
