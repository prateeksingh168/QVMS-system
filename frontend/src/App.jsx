import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RegisterVisitor from "./pages/RegisterVisitor";
import Scanner from "./pages/Scanner";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 Protected Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/visitor"
          element={
            <Layout>
              <RegisterVisitor />
            </Layout>
          }
        />
        <Route
          path="/scanner"
          element={
            <Layout>
              <Scanner />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;