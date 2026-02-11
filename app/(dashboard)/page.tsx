import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  MessageSquare,
  Calendar,
  Calculator,
  BookOpen,
  Check,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-[#061210] dark:via-[#081a14] dark:to-[#061210]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center lg:col-span-7 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-5xl md:text-6xl">
                Tu asistente fiscal
                <span className="block text-emerald-700 dark:text-emerald-400">
                  con inteligencia artificial
                </span>
              </h1>
              <p className="mt-4 text-base text-gray-600 dark:text-emerald-100/60 sm:mt-6 sm:text-xl lg:text-lg xl:text-xl max-w-2xl">
                Entiende tus obligaciones ante el SAT sin ser experto.
                Consulta tus dudas fiscales, simula tu regimen ideal y nunca
                pierdas una fecha limite de declaracion.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:max-w-lg sm:mx-auto lg:mx-0">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white text-lg rounded-full px-8"
                  >
                    Empieza gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-lg rounded-full px-8 dark:border-emerald-800 dark:text-emerald-200/70 dark:hover:bg-emerald-900/30"
                  >
                    Ver planes
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-emerald-200/40">
                Sin tarjeta de credito -- 5 consultas gratis al mes
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="bg-white dark:bg-[#0d1f18] rounded-2xl shadow-xl border border-gray-100 dark:border-emerald-900/30 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Chat Fiscal
                      </p>
                      <p className="text-xs text-gray-500 dark:text-emerald-200/40">
                        Consulta en tiempo real
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-emerald-900/20 rounded-lg p-3 ml-6">
                      <p className="text-sm text-gray-700 dark:text-emerald-100/70">
                        &ldquo;Estoy en RESICO y vendi $45,000 este mes. Cuanto ISR debo pagar?&rdquo;
                      </p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-800/20 rounded-lg p-3">
                      <p className="text-sm text-emerald-900 dark:text-emerald-200">
                        En RESICO, con ingresos de $45,000 mensuales tu tasa es de 1.50%.
                        El ISR a pagar seria de $675.00 MXN. Recuerda presentar
                        tu declaracion mensual a mas tardar el dia 17 del mes siguiente
                        (Art. 113-E LISR).
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-emerald-900/20 rounded-lg p-3 ml-6">
                      <p className="text-sm text-gray-700 dark:text-emerald-100/70">
                        &ldquo;Y el IVA?&rdquo;
                      </p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-800/20 rounded-lg p-3">
                      <p className="text-sm text-emerald-900 dark:text-emerald-200">
                        El IVA se calcula al 16% sobre tus ingresos gravados menos
                        el IVA acreditable de tus gastos deducibles...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-[#061210] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Todo lo que necesitas para cumplir con el SAT
            </h2>
            <p className="mt-3 text-lg text-gray-500 dark:text-emerald-200/50 max-w-2xl mx-auto">
              Herramientas disenadas para que entiendas y cumplas tus
              obligaciones fiscales sin complicaciones.
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {[
              {
                icon: MessageSquare,
                title: 'Chat fiscal con IA',
                desc: 'Pregunta lo que quieras sobre impuestos, SAT, declaraciones, deducciones y mas. Respuestas claras con referencias a ley.',
              },
              {
                icon: Calendar,
                title: 'Calendario fiscal',
                desc: 'Nunca pierdas una fecha limite. Visualiza declaraciones mensuales, anuales, DIOT e informativas segun tu regimen.',
              },
              {
                icon: Calculator,
                title: 'Simulador de regimen',
                desc: 'Compara RESICO vs Actividad Empresarial vs otros regimenes. Descubre cual te conviene segun tus ingresos y actividad.',
              },
              {
                icon: BookOpen,
                title: 'Explicaciones simples',
                desc: 'Sin lenguaje complicado. Cada concepto fiscal explicado de forma que cualquier persona pueda entenderlo.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="mt-10 lg:mt-0 text-center lg:text-left"
              >
                <div className="flex items-center justify-center lg:justify-start h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mx-auto lg:mx-0">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-emerald-200/50">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50 dark:bg-[#081a14]" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Planes simples, sin sorpresas
            </h2>
            <p className="mt-3 text-lg text-gray-500 dark:text-emerald-200/50">
              Elige el plan que mejor se adapte a tu negocio.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white dark:bg-[#0d1f18] rounded-2xl border border-gray-200 dark:border-emerald-900/30 p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gratuito
              </h3>
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Personal
              </h3>
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Empresarial
              </h3>
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
        </div>
      </section>

      {/* Trust section */}
      <section className="py-16 bg-emerald-800 dark:bg-emerald-900/30 dark:border-t dark:border-b dark:border-emerald-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-12 w-12 text-emerald-200" />
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Listo para simplificar tus impuestos?
          </h2>
          <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
            Miles de emprendedores y PyMEs mexicanas ya usan FiscalBot para
            entender sus obligaciones fiscales y cumplir a tiempo con el SAT.
          </p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-white text-emerald-800 hover:bg-emerald-50 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300 text-lg rounded-full px-8"
              >
                Empieza gratis ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-[#050e0b] border-t border-gray-200 dark:border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-space-grotesk)' }}>FB</span>
              </div>
              <span
                className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Fiscal
                <span className="text-emerald-600 dark:text-emerald-400">
                  Bot
                </span>
              </span>
            </div>
            <nav className="flex items-center gap-8">
              <a
                href="#pricing"
                className="text-sm text-gray-600 dark:text-emerald-200/50 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Precios
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-emerald-200/50 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Contacto
              </a>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-emerald-900/20">
            <p className="text-center text-sm text-gray-500 dark:text-emerald-200/30">
              2026 FiscalBot. Todos los derechos reservados. Este servicio
              no sustituye la asesoria de un contador publico certificado.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
