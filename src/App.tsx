import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

import { ErrorBoundary } from "./utils/errorBoundary";
import { SEOHead } from "./components/SEOHead";
const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Unique beautiful loading spinner component
function AnimatedSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin-slow shadow-lg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="36" height="36" viewBox="0 0 36 36" className="animate-pulse">
            <defs>
              <radialGradient id="spinner-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.7" />
              </radialGradient>
            </defs>
           
           
          </svg>
        </div>
        <span className="mt-6 text-white text-lg font-semibold tracking-wide animate-fade-in">
          Chargement...
        </span>
      </div>
    </div>
  );
}

// Custom slow spin animation (add to your global CSS, e.g. index.css or tailwind.config.js)
// .animate-spin-slow { animation: spin 1.5s linear infinite; }

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g. 1.5s)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AnimatedSpinner />;

  return (
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CartProvider>
            <BrowserRouter>
              <Layout>
                <SEOHead />
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/category/:categorySlug" element={<CategoryPage />} />
                  <Route path="/product/:productId" element={<ProductPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/admin" element={<Admin />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </ErrorBoundary>
    
  );
};

export default App;
