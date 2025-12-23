import "./globals.css";
import { RoleProvider } from "@/lib/role-context";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Proovd",
  description: "Pitch and connect.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body
        className="antialiased font-sans bg-brand-bg text-brand-text min-h-screen flex flex-col"
        suppressHydrationWarning>
        <RoleProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
            {children}
          </main>
        </RoleProvider>
      </body>
    </html>
  );
}
