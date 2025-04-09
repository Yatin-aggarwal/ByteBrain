// app/layout.jsx
import {AuthProvider} from './AuthProvider';
import './globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <AuthProvider>
      <body className={"bg-black"}>{children}</body>
    </AuthProvider>
    </html>
  );
}