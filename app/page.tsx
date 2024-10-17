import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-8">Tinta fantasma</h1>
      <div className="space-y-4">
        <Link href="/palabras">
          <Button className="w-64 h-16 text-2xl py-4 px-6 m-2">Palabras</Button>
        </Link>
        <Link href="/pistas">
          <Button className="w-64 h-16 text-2xl py-4 px-6 m-2">Pistas</Button>
        </Link>
      </div>
    </div>
  );
}