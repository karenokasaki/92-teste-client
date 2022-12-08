import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import { AuthContextComponent } from "./contexts/authContext";
import { ProtectedRoute } from "./components/ProtectRoute";
import TarefasPage from "./pages/TarefasPage";
import NavBar from "./components/NavBar";
import NotificacoesPage from "./pages/NotificacoesPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <AuthContextComponent>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={ProfilePage} />}
          />
          <Route
            path="/tarefas"
            element={<ProtectedRoute Component={TarefasPage} />}
          />
          <Route
            path="/notificacoes"
            element={<ProtectedRoute Component={NotificacoesPage} />}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute Component={AdminPage} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
