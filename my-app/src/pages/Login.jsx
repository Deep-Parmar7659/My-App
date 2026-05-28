import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import Loader from "../components/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loading, setLoading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate auth delay, then login and navigate ONCE
    setTimeout(() => {
      login({ name: "Deep", email });
      setLoading(false);
      navigate("/dashboard", { replace: true });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
          Login
        </h1>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
