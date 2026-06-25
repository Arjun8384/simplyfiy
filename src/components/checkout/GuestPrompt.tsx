"use client";

import { useState } from "react";

export default function GuestPrompt() {
  const [closed, setClosed] =
    useState(false);

  if (closed) return null;

  return (
    <div className="mb-6 rounded-lg border border-orange-300 bg-orange-50 p-4">
      <div className="flex items-center justify-between">
        <p>
          Create an account to track
          orders and save addresses.
        </p>

        <button
          onClick={() =>
            setClosed(true)
          }
          className="cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}