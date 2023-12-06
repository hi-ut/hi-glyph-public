"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({
  children,
  className,
  session,
}: {
  children: React.ReactNode;
  className?: string;
  session: Session | null;
}) {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <div className={className}>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </div>
      </SessionProvider>
    </NextUIProvider>
  );
}
