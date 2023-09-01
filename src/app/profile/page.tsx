"use client";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetail = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-center">Profile Page</h1>
      <hr />
      <h1>Profile</h1>
      <hr />
      <h2 className="p-1 rounded bg-gray-400">
        {data === "nothing" ? (
          "Nothing "
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className=" mt-4
      bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus
      
      "
      >
        Logout
      </button>
      <button
        onClick={getUserDetail}
        className=" mt-4
      bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus
      
      "
      >
        Get User Detail
      </button>
    </div>
  );
}
