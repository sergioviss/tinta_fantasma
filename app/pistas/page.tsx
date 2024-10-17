'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { pistas } from '@/lib/data';

export default function PistasPage() {
  const [pistasAleatorias, setPistasAleatorias] = useState<string[]>([]);
  const [pistasSeleccionadas, setPistasSeleccionadas] = useState<string[]>([]);
  const [pistaFinal, setPistaFinal] = useState<string | null>(null);
  const [etapa, setEtapa] = useState<'seleccion' | 'confirmacion' | 'final'>('seleccion');

  useEffect(() => {
    const seleccionarPistasAleatorias = () => {
      const pistasSeleccionadas = [];
      const copiaPistas = [...pistas];
      for (let i = 0; i < 7; i++) {
        const indiceAleatorio = Math.floor(Math.random() * copiaPistas.length);
        pistasSeleccionadas.push(copiaPistas[indiceAleatorio]);
        copiaPistas.splice(indiceAleatorio, 1);
      }
      setPistasAleatorias(pistasSeleccionadas);
    };

    seleccionarPistasAleatorias();
  }, []);

  const seleccionarPista = (pista: string) => {
    if (pistasSeleccionadas.includes(pista)) {
      setPistasSeleccionadas(pistasSeleccionadas.filter(p => p !== pista));
    } else if (pistasSeleccionadas.length < 2) {
      setPistasSeleccionadas([...pistasSeleccionadas, pista]);
    }
  };

  const confirmarSeleccion = () => {
    if (pistasSeleccionadas.length === 2) {
      setEtapa('confirmacion');
    }
  };

  const seleccionarPistaFinal = (pista: string) => {
    setPistaFinal(pista);
    setEtapa('final');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Pistas</h1>
      {etapa === 'seleccion' && (
        <div className="mb-8 w-full max-w-2xl">
          <p className="text-2xl mb-4">Selecciona 2 pistas:</p>
          <ul className="space-y-4">
            {pistasAleatorias.map((pista, index) => (
              <li key={index}>
                <Button
                  onClick={() => seleccionarPista(pista)}
                  className={`w-full min-h-[80px] text-xl py-4 px-6 whitespace-normal ${
                    pistasSeleccionadas.includes(pista) ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {index + 1}. {pista}
                </Button>
              </li>
            ))}
          </ul>
          <Button
            onClick={confirmarSeleccion}
            disabled={pistasSeleccionadas.length !== 2}
            className="mt-6 w-full text-xl py-4 px-6"
          >
            Siguiente
          </Button>
        </div>
      )}
      {etapa === 'confirmacion' && (
        <div className="mb-8 w-full max-w-2xl">
          <p className="text-2xl mb-4">Selecciona la pista final:</p>
          <ul className="space-y-4">
            {pistasSeleccionadas.map((pista, index) => (
              <li key={index}>
                <Button
                  onClick={() => seleccionarPistaFinal(pista)}
                  className="w-full min-h-[80px] text-xl py-4 px-6 whitespace-normal"
                >
                  {index + 1}. {pista}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {etapa === 'final' && pistaFinal && (
        <div className="mb-8 w-full max-w-2xl">
          <p className="text-2xl mb-4">Pista final:</p>
          <p className="text-3xl font-bold p-6 bg-primary text-primary-foreground rounded-lg">{pistaFinal}</p>
        </div>
      )}
      <Link href="/">
        <Button className="w-64 h-16 text-xl py-4 px-6">Regresar al Menú Principal</Button>
      </Link>
    </div>
  );
}