import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import Index from "@/pages/Index";
import Buy from "@/pages/Buy";
import Rent from "@/pages/Rent";
import Sell from "@/pages/Sell";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import RegisterForm from "@/pages/RegisterForm";
import Profile from "@/pages/Profile";
import PropertyDetails from "@/pages/PropertyDetails";
import Favorites from "@/pages/Favorites";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import VerificationForm from "@/pages/VerificationForm";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/form" element={<RegisterForm />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/rent" element={
                <ProtectedRoute>
                  <Rent />
                </ProtectedRoute>
              } />
              <Route path="/sell" element={
                <ProtectedRoute>
                  <Sell />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
              <Route path="/verify" element={<VerificationForm />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
