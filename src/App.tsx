
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import Layout from "./Layout";
import Home from "./pages/Home";
import { PropertyMatchNotifier } from "@/components/PropertyMatchNotifier";

// Lazy loaded components
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const Register = lazy(() => import("./pages/Register"));
const RegisterForm = lazy(() => import("./pages/RegisterForm"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <PropertyMatchNotifier />
        <Toaster position="top-center" richColors closeButton />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Properties />
              </Suspense>
            } />
            <Route path="/properties/:id" element={
              <Suspense fallback={<div>Loading...</div>}>
                <PropertyDetail />
              </Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<div>Loading...</div>}>
                <AboutUs />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Contact />
              </Suspense>
            } />
            <Route path="/register" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            } />
            <Route path="/register-form" element={
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterForm />
              </Suspense>
            } />
            <Route path="/login" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
