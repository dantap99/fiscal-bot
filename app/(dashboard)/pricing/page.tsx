import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Planes y precios
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-emerald-200/50">
          Elige el plan ideal para tus necesidades fiscales.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free */}
        <div className="bg-white dark:bg-[#0d1f18] rounded-2xl border border-gray-200 dark:border-emerald-900/30 p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gratuito
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-emerald-200/50">
            Para conocer la plataforma
          </p>
          <p className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
            $0
            <span className="text-base font-normal text-gray-500 dark:text-emerald-200/50">
              /mes
            </span>
          </p>
          <ul className="mt-8 space-y-3">
            {[
              '5 consultas al mes',
              'Simulador de regimen',
              'Calendario fiscal basico',
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-emerald-100/70">
                  {f}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/sign-up" className="block mt-8">
            <Button
              variant="outline"
              className="w-full rounded-full dark:border-emerald-800 dark:text-emerald-200/70"
            >
              Comenzar gratis
            </Button>
          </Link>
        </div>

        {/* Personal */}
        <div className="bg-white dark:bg-[#0d1f18] rounded-2xl border-2 border-emerald-600 dark:border-emerald-500 p-8 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Popular
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Personal
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-emerald-200/50">
            Para personas fisicas
          </p>
          <p className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
            $299
            <span className="text-base font-normal text-gray-500 dark:text-emerald-200/50">
              /mes
            </span>
          </p>
          <ul className="mt-8 space-y-3">
            {[
              'Consultas ilimitadas',
              'Simulador avanzado',
              'Calendario personalizado',
              'Historial de consultas',
              'Alertas por correo',
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-emerald-100/70">
                  {f}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/sign-up" className="block mt-8">
            <Button className="w-full rounded-full bg-emerald-700 hover:bg-emerald-800 text-white">
              Comenzar ahora
            </Button>
          </Link>
        </div>

        {/* Empresarial */}
        <div className="bg-white dark:bg-[#0d1f18] rounded-2xl border border-gray-200 dark:border-emerald-900/30 p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Empresarial
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-emerald-200/50">
            Para PyMEs y equipos
          </p>
          <p className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
            $999
            <span className="text-base font-normal text-gray-500 dark:text-emerald-200/50">
              /mes
            </span>
          </p>
          <ul className="mt-8 space-y-3">
            {[
              'Todo del plan Personal',
              'Multiples usuarios',
              'Consultas para personas morales',
              'Soporte prioritario',
              'Reportes mensuales',
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-emerald-100/70">
                  {f}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/sign-up" className="block mt-8">
            <Button
              variant="outline"
              className="w-full rounded-full dark:border-emerald-800 dark:text-emerald-200/70"
            >
              Contactar ventas
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
