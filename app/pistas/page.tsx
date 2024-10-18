'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { pistas } from '@/lib/data';
import { useGame } from '@/lib/GameContext';

export default function PistasPage() {
  const { saveQuestion } = useGame();
  const [pistasAleatorias, setPistasAleatorias] = useState<string[]>([]);
  const [pistasSeleccionadas, setPistasSeleccionadas] = useState<string[]>([]);
  const [pistaFinal, setPistaFinal] = useState<string | null>(null);
  const [etapa, setEtapa] = useState<'seleccion' | 'confirmacion' | 'final'>('seleccion');
  const [tiempoRestante, setTiempoRestante] = useState<number | null>(null);
  const [contadorActivo, setContadorActivo] = useState(false);
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState<number>(60);

  useEffect(() => {
    // Mover la inicialización de localStorage aquí
    const tiempoGuardado = localStorage.getItem('tiempoSeleccionado');
    if (tiempoGuardado) {
      setTiempoSeleccionado(parseInt(tiempoGuardado, 10));
    }

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
    saveQuestion(pista); // Guardamos la pista final seleccionada
  };

  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (contadorActivo && tiempoRestante !== null && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (tiempoRestante === 0) {
      setContadorActivo(false);
    }
    return () => clearInterval(intervalo);
  }, [contadorActivo, tiempoRestante]);

  const iniciarContador = () => {
    setTiempoRestante(tiempoSeleccionado);
    setContadorActivo(true);
  };

  const cambiarTiempoSeleccionado = (nuevoTiempo: number[]) => {
    const tiempo = nuevoTiempo[0];
    setTiempoSeleccionado(tiempo);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tiempoSeleccionado', tiempo.toString());
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Pistas</h1>
        {etapa === 'seleccion' && (
          <div className="mb-8 w-full max-w-2xl">
            <p className="text-2xl mb-4">Selecciona 2 pistas:</p>
            <ul className="space-y-4">
              {pistasAleatorias.map((pista, index) => (
                <li key={index}>
                  <Button
                    onClick={() => seleccionarPista(pista)}
                    className={`w-full h-16 text-xl py-4 px-6 whitespace-normal hover:bg-primary hover:text-primary-foreground ${
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
              className="mt-4 w-full h-16 text-xl font-extrabold py-4 px-6 bg-green-700"
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
                    className="w-full h-16 text-xl py-4 px-6 whitespace-normal"
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
            {tiempoRestante === null && (
              <>
                <p className="text-2xl mb-4">Pista final:</p>
                <p className="text-3xl font-bold p-6 bg-primary text-primary-foreground rounded-lg">{pistaFinal}</p>
              </>
            )}
            {tiempoRestante === null ? (
              <Button onClick={iniciarContador} className="mt-4 h-16 text-xl px-6 bg-blue-500">
                Comenzar Tiempo
              </Button>
            ) : (
              <div className={`mt-4 p-6 rounded-lg ${tiempoRestante === 0 ? 'bg-red-600' : 'bg-black'}`}>
                <p className="text-4xl font-bold text-white">
                  {tiempoRestante === 0 ? 'Se acabó el tiempo' : `${tiempoRestante}`}
                </p>
              </div>
            )}
          </div>
        )}
        {(tiempoRestante === null || tiempoRestante === 0) && (
          <Link href="/" className="flex justify-center mt-16">
            <Button className="h-16 text-xl px-6 bg-gray-400">
              <span className="mr-2">←</span> Menú Principal
            </Button>
          </Link>
        )}
      </div>
      <footer className="sticky bottom-0 w-full bg-gray-100 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <Slider
            value={[tiempoSeleccionado]}
            onValueChange={cambiarTiempoSeleccionado}
            max={120}
            min={30}
            step={30}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>30s</span>
            <span>60s</span>
            <span>90s</span>
            <span>120s</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
