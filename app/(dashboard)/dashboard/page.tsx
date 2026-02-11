import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageSquare, Calendar, Calculator, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardOverviewPage() {
  const stats = [
    {
      title: 'Consultas este mes',
      value: '0',
      description: 'de 5 disponibles (plan gratuito)',
      icon: MessageSquare,
      color: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      title: 'Proxima declaracion',
      value: '17 Feb',
      description: 'Declaracion mensual ISR/IVA',
      icon: Calendar,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      title: 'Tu regimen',
      value: 'Sin definir',
      description: 'Usa el simulador para encontrar el tuyo',
      icon: Calculator,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Declaracion anual',
      value: 'Abril 2026',
      description: 'Fecha limite para personas fisicas',
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  const quickActions = [
    {
      title: 'Consultar dudas fiscales',
      description: 'Pregunta sobre ISR, IVA, RESICO, deducciones y mas',
      href: '/dashboard/chat',
      icon: MessageSquare,
    },
    {
      title: 'Simular mi regimen',
      description: 'Descubre que regimen fiscal te conviene',
      href: '/dashboard/simulador',
      icon: Calculator,
    },
    {
      title: 'Ver calendario fiscal',
      description: 'Fechas limite de declaraciones y obligaciones',
      href: '/dashboard/calendario',
      icon: Calendar,
    },
  ];

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-white mb-6">
        Bienvenido a FiscalBot
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-emerald-200/50">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-emerald-200/40 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Acciones rapidas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors cursor-pointer h-full">
              <CardContent className="pt-0">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <action.icon className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-emerald-200/50 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Info banner */}
      <Card className="mt-8 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30">
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-emerald-900 dark:text-emerald-300">
                Importante
              </h3>
              <p className="text-sm text-emerald-800 dark:text-emerald-200/70 mt-1">
                FiscalBot es una herramienta de orientacion fiscal. Para
                decisiones criticas, consulta siempre con un contador publico
                certificado.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
