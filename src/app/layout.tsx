import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from '@/context/ChatContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Nexus - The Future of AI Conversations",
  description: "Experience the next generation of artificial intelligence with AI Nexus.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#050505] text-white`}>
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}