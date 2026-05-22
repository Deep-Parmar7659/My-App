import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";

import CounterDemo from "./pages/CounterDemo";
import ReducerForm from "./pages/ReducerForm";

import ProtectedRoute from "./components/ProtectedRoute";
import TestAbort from "./pages/TestAbort";
import TestApiAbort from "./pages/TestApiAbort";
import TestUseFetchAbort from "./pages/TestUseFetchAbort";
import TestDebounce from "./pages/TestDebounce";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="counter" element={<CounterDemo />} />
          <Route path="reducer-form" element={<ReducerForm />} />
          <Route path="test-abort" element={<TestAbort />} />
          <Route path="test-api-abort" element={<TestApiAbort />} />
          <Route path="test-usefetch-abort" element={<TestUseFetchAbort />} />
          <Route path="/test-debounce" element={<TestDebounce />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
