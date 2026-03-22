import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateCardPage from "./pages/CreateCardPage";
import SavedCardsPage from "./pages/SavedCardsPage";
import TemplatesPage from "./pages/TemplatesPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/create-card"
          element={<ProtectedRoute><CreateCardPage /></ProtectedRoute>}
        />
        <Route
          path="/saved-cards"
          element={<ProtectedRoute><SavedCardsPage /></ProtectedRoute>}
        />
        <Route
          path="/templates"
          element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
