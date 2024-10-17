'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { palabras } from '@/lib/data';

export default function PalabrasPage() {
  const [palabrasAleatorias, setPalabrasAleatorias] = useState<string[]>([]);

  useEffect(() => {
    const seleccionarPalabrasAleatorias = () => {
      const palabrasSeleccionadas = [];
      const copiapalabras = [...palabras];
      for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * copiapalabras.length);
        palabrasSeleccionadas.push(copiapalabras[indiceAleatorio]);
        copiapalabras.splice(indiceAleatorio, 1);
      }
      setPalabrasAleatorias(palabrasSeleccionadas);
    };

    seleccionarPalabrasAleatorias();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Palabras Aleatorias</h1>
      <ul className="space-y-4 mb-8 w-full max-w-md">
        {palabrasAleatorias.map((palabra, index) => (
          <li key={index} className="text-2xl bg-secondary text-secondary-foreground p-4 rounded-lg">
            {index + 1}. {palabra}
          </li>
        ))}
      </ul>
      <Link href="/">
        <Button className="w-64 h-16 text-xl py-4 px-6">Regresar al Menú Principal</Button>
      </Link>
    </div>
  );
}