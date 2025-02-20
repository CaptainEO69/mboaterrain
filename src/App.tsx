
import Root from "@/components/Root";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import RegisterForm from "@/pages/RegisterForm";
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
import Contact from "@/pages/Contact";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/form" element={<RegisterForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}
