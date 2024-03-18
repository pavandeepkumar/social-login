"use client";
import { signOut } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div>
      <h2>Welcome to Google Login</h2>
      <button
        onClick={() => {
          signOut({ callbackUrl: "http://localhost:3000/dashboard",redirect:true });
        }}
      >
        SignOut With google
      </button>
    </div>
  );
};

export default page;
