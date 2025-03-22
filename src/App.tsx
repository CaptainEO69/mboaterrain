
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Header } from "@/components/Header";
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
import Contact from "@/pages/Contact";
import Messaging from "@/pages/Messaging";
import MapView from "@/pages/MapView";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { BottomNav } from "@/components/BottomNav";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/form" element={<RegisterForm />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/messaging" element={<Messaging />} />

                <Route path="/favorites" element={
                  <ProtectedRoute>
                    <Favorites />
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

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <BottomNav />
            <ChatWindow />
          </div>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
