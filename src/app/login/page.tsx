"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "../Hooks/useApi";
import Loading from "../components/Loading";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { request, loading, error } = useApi();
  const [localError, setLocalError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    const result = await request("/login", {
      method: "POST",
      body: { user: { email, password } },
    });

    if (!result) {
      setLocalError("Invalid email or password");
      return;
    }

    const { json, authHeader } = result;
    const token = authHeader?.split(" ")[1];

    if (token) localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(json));

    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 px-8 pb-2 bg-neutral-900 rounded-3xl transition-transform duration-300 ease-in-out 
         hover:border hover:border-black w-[24rem]"
      >
        <p className="text-center my-8 text-white text-lg">Login</p>

        {error && <div className="text-red-500 text-center mb-2">{error}</div>}

        <div className="flex items-center justify-center gap-2 rounded-3xl px-3 py-2 bg-neutral-900 shadow-inner shadow-black">
          <svg
            className="h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
          </svg>
          <input
            type="email"
            placeholder="Email"
            className="bg-neutral-900 border-none outline-none w-full text-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

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
            type="password"
            placeholder="Password"
            className="bg-transparent border-none outline-none w-full text-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-center mt-10 gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-neutral-800 text-white transition duration-300 hover:bg-black w-full"
            disabled={loading}
          >
            {loading ? <Loading /> : "Login"}
          </button>
        </div>

        <button
          type="button"
          className="my-4 px-4 py-2 rounded-md bg-neutral-800 text-white transition duration-300 hover:bg-red-600"
        >
          Forgot Password
        </button>

        <div className="text-center mb-6">
          <Link href="/registration" className="text-sm text-blue-400 hover:underline">
            Don&#39;t have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
