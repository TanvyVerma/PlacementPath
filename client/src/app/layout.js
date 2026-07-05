import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'PlacementPath',
  description: 'Crowdsourced placement intelligence for tier 2/3 engineers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}