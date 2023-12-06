import "./globals.css";

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import CommonNavBar from "@/components/nav-bar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import Container from "@/components/container";

export const metadata: Metadata = {
  title: "Hi Glyph",
  description: "A lightweight Chinese character glyph platform.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ja" data-theme="corporate">
      <body>
        <Providers
          className="flex flex-col justify-between min-h-screen"
          session={session}
        >
          <Container>
            <CommonNavBar />
            {children}
          </Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
