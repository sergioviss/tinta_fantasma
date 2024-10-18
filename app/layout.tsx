import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GameProvider } from '@/lib/GameContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tinta fantasma',
  description: 'Juego de palabras',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
