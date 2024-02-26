"use client";

import { signIn } from "next-auth/react";

export default function Test() {
  return (
    <button
      onClick={async () => {
        await signIn("credentials", { callbackUrl: `/` });
      }}
    >
      로그아웃
    </button>
  );
}
