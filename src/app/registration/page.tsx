"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../components/Loading";
import { useApi } from "../Hooks/useApi";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { request, loading } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await request("/signup", {
      method: "POST",
      body: { user: { email, password } },
    });

    if (!result) {
      setError("Failed to register");
      return;
    }

    const { json } = result;

    localStorage.setItem("token", json.token);
    localStorage.setItem("user", JSON.stringify(json.user));

    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 px-8 pb-2 bg-neutral-900 rounded-3xl transition-transform duration-300 ease-in-out 
         hover:border hover:border-black w-[24rem]"
      >
        <p className="text-center my-8 text-white text-lg">Register</p>

        {error && <div className="text-red-500 text-center mb-2">{error}</div>}

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />

        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <div className="flex justify-center mt-10 gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-neutral-800 text-white transition duration-300 hover:bg-black w-full"
            disabled={loading}
          >
            {loading ? <Loading /> : "Register"}
          </button>
        </div>

        <div className="text-center mb-6">
          <Link
            href="/login"
            className="text-sm text-blue-400 hover:underline"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="flex items-center justify-center gap-2 rounded-3xl px-3 py-2 bg-neutral-900 shadow-inner shadow-black">
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>
    <input
      type={type}
      placeholder={placeholder}
      className="bg-transparent border-none outline-none w-full text-gray-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

export default Registration;
