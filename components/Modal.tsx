// components/LoginModal.tsx
"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal } = useAuthContext();
  const router = useRouter();

  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="relative bg-white w-[400px] p-6 rounded-xl shadow-xl">
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-2">Login Required</h2>
        <p className="text-gray-600 mb-4">Please log in or sign up to access this feature.</p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setShowLoginModal(false);
              router.push("/login");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Log In
          </Button>
          <button
            onClick={() => {
              setShowLoginModal(false);
              router.push("/signup");
            }}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
