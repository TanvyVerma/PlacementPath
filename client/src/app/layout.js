import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PlacementPath',
  description: 'Crowdsourced placement intelligence for tier 2/3 engineers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}