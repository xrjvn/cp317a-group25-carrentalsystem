"use client";
import { useState } from "react";
import { mockStore } from "../../lib/mockData";

export default function ProfilePage() {
  const [name, setName] = useState(mockStore.user.name);
  const [email, setEmail] = useState(mockStore.user.email);
  const [license, setLicense] = useState(mockStore.user.license);

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mockStore.user = { name, email, license };
    alert("✅ Profile saved (mock).");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={save} className="bg-white p-4 rounded-xl shadow space-y-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="border rounded w-full p-2" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="border rounded w-full p-2" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Driver’s License</label>
          <input className="border rounded w-full p-2" value={license} onChange={e=>setLicense(e.target.value)} />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </main>
  );
}