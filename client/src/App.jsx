import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";
import Navbar from './components/Navbar'
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <main className="container mx-auto px-2">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/add-tasks" element={<TaskFormPage />} />
            <Route path="/tasks/:id" element={<TaskFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}
export default App;
