import './globals.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Inter } from 'next/font/google';
// import Footer from './components/Footer';
import Hero from './components/Hero';
import Header from './components/Header';
import { useAlertStore } from '@/store/alertStore';
// import PageScene from './three/PageScene';
import { NextAuthProvider } from './providers';
import Alerts from './components/Alerts';
import Footer from './components/Footer';
import PageScene from './components/three/PageScene';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  // alerts

  // get data for hero title

  return (
    <NextAuthProvider>
      <html lang="en">
        <body>
          <Header />
          <main>
            <PageScene />
            <Hero />
            {children}
            <Alerts />
            <Footer />
          </main>
        </body>
      </html>
    </NextAuthProvider>
  );
}
