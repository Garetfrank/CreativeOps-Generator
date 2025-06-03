"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "./auth-provider";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <nav className="w-full bg-[#181c2b] text-white px-6 py-3 flex items-center justify-between shadow">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-lg hover:underline">CreativeOps</Link>
        <Link href="/script-generator" className="hover:underline">Script Generator</Link>
        <Link href="/project-board" className="hover:underline">Project Board</Link>
        {/* Add more links as needed */}
      </div>
      <div className="flex items-center gap-4">
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <button onClick={handleSignOut} className="bg-red-600 px-3 py-1 rounded text-white text-sm hover:bg-red-700">Sign Out</button>
          </>
        ) : (
          <Link href="/auth" className="bg-blue-600 px-3 py-1 rounded text-white text-sm hover:bg-blue-700">Sign In</Link>
        )}
      </div>
    </nav>
  );
} 