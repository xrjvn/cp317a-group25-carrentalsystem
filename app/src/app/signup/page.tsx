"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    license: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.find((u: any) => u.email === form.email);
    if (exists) {
      alert("Email already registered.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sign Up</h1>

        <form onSubmit={handleSignup} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Create Account</h2>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input 
                id="name"
                name="name" 
                placeholder="Enter your full name" 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 
                           transition-all duration-200 bg-white text-gray-900
                           hover:border-gray-300 shadow-sm hover:shadow-md" 
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                id="email"
                name="email" 
                type="email"
                placeholder="Enter your email" 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 
                           transition-all duration-200 bg-white text-gray-900
                           hover:border-gray-300 shadow-sm hover:shadow-md" 
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input 
                id="password"
                name="password" 
                type="password"
                placeholder="Create a password" 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 
                           transition-all duration-200 bg-white text-gray-900
                           hover:border-gray-300 shadow-sm hover:shadow-md" 
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-2">
                Driver's License Number
              </label>
              <input 
                id="license"
                name="license" 
                placeholder="Enter your driver's license number" 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 
                           transition-all duration-200 bg-white text-gray-900
                           hover:border-gray-300 shadow-sm hover:shadow-md" 
                onChange={handleChange}
                required
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg 
                           font-semibold shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-800 
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                           transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}