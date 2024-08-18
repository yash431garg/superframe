import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
import ProviderWrapper from "../app/components/dynamicWrapper";



import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ['300'] });

export const metadata: Metadata = {
  title: "Superframe",
  description: "Create and orgainse event in few steps.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {

  return (

    <html lang="en">
          
      <body className={roboto.className}>
      <ProviderWrapper>
        <Header />
        <main className="h-screen" style={{ height: '90vh' }}>
            {children}
          <Toaster position="bottom-center" toastOptions={{
            className: '',
            duration: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 2000,
            }
          }} />
        </main>
        </ProviderWrapper>
        <Footer />
      </body>
    
    </html>


  );
}
