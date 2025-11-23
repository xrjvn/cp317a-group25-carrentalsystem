"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find((u: any) => u.email === email);

    if (!user) {
      alert("No user with that email");
      return;
    }

    if (user.password !== password) {
      alert("Incorrect password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Login</h1>

        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Sign In</h2>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                id="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-200 bg-white text-gray-900
                           hover:border-gray-300 shadow-sm hover:shadow-md" 
                placeholder="Enter your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input 
                type="password" 
                id="password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-200 bg-white text-gray-900
                           hover:border-gray-300 shadow-sm hover:shadow-md" 
                placeholder="Enter your password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg 
                           font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                           transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}