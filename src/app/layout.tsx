import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
import SessionWrapper from './components/SessionWrapper';

import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ['300'] });

export const metadata: Metadata = {
  title: "Luma Frames",
  description: "Create frames for your Luma event",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={roboto.className}>
          <Header />
          <main className="h-screen" style={{ height: '90vh' }}>
            {children}
            <Toaster position="bottom-center" toastOptions={{
              // Define default options
              className: '',
              duration: 1000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              // Default options for specific types
              success: {
                duration: 2000,
              }
            }} />
          </main>
          {/* <Footer /> */}
        </body>
      </html>
    </SessionWrapper>
  );
}
