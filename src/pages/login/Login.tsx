import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl px-8 py-10 w-full max-w-md border border-gray-100"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Log in to your account to continue
        </p>
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            placeholder="••••••••"
          />
        </div>
        {!isPending && (
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        )}
        {isPending && (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-2.5 rounded-lg font-medium cursor-not-allowed"
          >
            Loading...
          </button>
        )}
        {error && (
          <div className="mt-4 text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        <p className="mt-8 text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
