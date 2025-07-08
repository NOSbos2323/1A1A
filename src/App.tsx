import { Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import PaymentsPage from "./components/payments/PaymentsPage";
import { NetworkStatus } from "./components/ui/network-status";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* For the tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payments" element={<PaymentsPage />} />

        {/* Add this before the catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

        {/* Redirect root to login */}
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>

      {/* Network status indicator */}
      <NetworkStatus />
    </div>
  );
}

export default App;
