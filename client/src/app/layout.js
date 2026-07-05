import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import './globals.css';

export const metadata = {
  title: 'PlacementPath',
  description: 'Crowdsourced placement intelligence for tier 2/3 engineers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}