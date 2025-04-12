import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import QRCodes from "./pages/QRCodes";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Attendance from "./pages/Attendance";
import { AuthProvider } from "@/components/auth/AuthProvider"; // Asegúrate de importar el proveedor de autenticación

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider> {/* Envolviendo la app con AuthProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/qrcodes" element={<QRCodes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
