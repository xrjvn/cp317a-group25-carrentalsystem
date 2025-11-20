"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u: any) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Profile updated!");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="space-y-4 bg-white p-4 rounded shadow">
        <input
          value={user.name}
          className="w-full border p-2 rounded"
          onChange={e => setUser({ ...user, name: e.target.value })}
        />

        <input
          value={user.email}
          className="w-full border p-2 rounded"
          onChange={e => setUser({ ...user, email: e.target.value })}
        />

        <input
          value={user.license}
          className="w-full border p-2 rounded"
          onChange={e => setUser({ ...user, license: e.target.value })}
        />

        <button onClick={handleSave} className="bg-blue-600 text-white p-2 rounded">
          Save Changes
        </button>
      </div>
    </main>
  );
}