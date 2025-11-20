import React from "react";
import Link from "next/link";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">1427 Authors Hub</Link>
          <nav className="space-x-4 text-sm text-gray-600">
            <Link href="/">Stories</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="container py-8">{children}</main>
      <footer className="mt-12 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} 1427 Authors Hub
      </footer>
    </div>
  );
};