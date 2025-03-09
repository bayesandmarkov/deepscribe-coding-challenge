import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ActiveLink } from "@/components/Navbar";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publicSans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medical Document Chatbot",
  description: "Medical Document Chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Medical Document Chatbot</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </head>
      <body className="flex flex-col h-screen">
        <header className="bg-secondary p-4 relative">
          <nav className="absolute top-2 right-4 m-2 z-1">
          <Button asChild variant="outline" size="default">
                    <a
                      href="https://github.com/will-pang/generic_document_chatbot"
                      target="_blank"
                    >
                      <GithubIcon className="size-3" />
                      <span>Open in GitHub</span>
                    </a>
          </Button>
          </nav>
        </header>
        <main className="flex-grow">
          <NuqsAdapter>
            <div className="bg-secondary grid grid-rows-[auto,1fr] h-[100dvh]">
              <div className="bg-background mx-6 relative grid">
                <div className="absolute inset-0">{children}</div>
              </div>
            </div>
          </NuqsAdapter>
        </main>
      </body>
    </html>
  );
}
