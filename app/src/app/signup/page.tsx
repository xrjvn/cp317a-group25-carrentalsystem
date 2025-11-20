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
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSignup} className="space-y-4">
        <input name="name" placeholder="Name" className="w-full p-2 border rounded" onChange={handleChange}/>
        <input name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange}/>
        <input name="password" placeholder="Password" type="password" className="w-full p-2 border rounded" onChange={handleChange}/>
        <input name="license" placeholder="Driver’s License" className="w-full p-2 border rounded" onChange={handleChange}/>

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Create Account
        </button>
      </form>
    </main>
  );
}