import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

// Configure Roboto font
const roboto = Roboto({
  subsets: ['latin'], // Supports Latin characters
  weight: ['400', '700'], // Load specific font weights (Regular & Bold)
  style: ['normal', 'italic'], // Include normal & italic styles
  display: 'swap', // Ensures text is visible while the font loads
  variable: '--font-roboto', // Creates a CSS variable for usage in styles
});

export const metadata: Metadata = {
  title: 'Globetrotter - Travel Guessing Game',
  description: 'Guess famous destinations based on cryptic clues!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
