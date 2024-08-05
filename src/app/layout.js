import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import LayoutProvider from "./providers/layout-provider";
import ThemeProvider from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Resumeee",
  description: "A full stack application to create resumes",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
