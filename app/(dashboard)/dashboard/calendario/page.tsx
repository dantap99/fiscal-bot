'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

type FiscalEvent = {
  id: string;
  dia: number;
  mes: number; // 1-12
  titulo: string;
  descripcion: string;
  tipo: 'mensual' | 'anual' | 'informativa';
  regimenes: string[]; // 'todos' | 'resico' | 'ae' | 'pm'
};

const FISCAL_EVENTS: FiscalEvent[] = [
  // Monthly obligations (repeat every month)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `isr-iva-${i + 1}`,
    dia: 17,
    mes: i + 1,
    titulo: 'Declaracion mensual ISR e IVA',
    descripcion:
      'Fecha limite para presentar la declaracion provisional de ISR y definitiva de IVA del mes anterior.',
    tipo: 'mensual' as const,
    regimenes: ['todos'],
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `retenciones-${i + 1}`,
    dia: 17,
    mes: i + 1,
    titulo: 'Entero de retenciones',
    descripcion:
      'Fecha limite para enterar las retenciones de ISR e IVA realizadas a terceros.',
    tipo: 'mensual' as const,
    regimenes: ['ae', 'pm'],
  })),
  // DIOT (monthly, some cases)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `diot-${i + 1}`,
    dia: 17,
    mes: i + 1,
    titulo: 'DIOT (Declaracion Informativa de Operaciones con Terceros)',
    descripcion:
      'Informar al SAT las operaciones con proveedores del mes anterior. Obligatoria para quienes pagan IVA.',
    tipo: 'informativa' as const,
    regimenes: ['ae', 'pm'],
  })),
  // Annual - Personas Morales
  {
    id: 'anual-pm',
    dia: 31,
    mes: 3,
    titulo: 'Declaracion anual - Personas Morales',
    descripcion:
      'Fecha limite para presentar la declaracion anual de ISR para personas morales (Art. 9 LISR).',
    tipo: 'anual' as const,
    regimenes: ['pm'],
  },
  // Annual - Personas Fisicas
  {
    id: 'anual-pf',
    dia: 30,
    mes: 4,
    titulo: 'Declaracion anual - Personas Fisicas',
    descripcion:
      'Fecha limite para presentar la declaracion anual de ISR para personas fisicas (Art. 150 LISR).',
    tipo: 'anual' as const,
    regimenes: ['todos'],
  },
  // Constancias de retenciones
  {
    id: 'constancias-ret',
    dia: 15,
    mes: 2,
    titulo: 'Constancias de retenciones',
    descripcion:
      'Fecha limite para entregar las constancias de retenciones de ISR e IVA a terceros.',
    tipo: 'informativa' as const,
    regimenes: ['ae', 'pm'],
  },
  // Informativa de clientes y proveedores
  {
    id: 'informativa-cp',
    dia: 15,
    mes: 2,
    titulo: 'Informativa de clientes y proveedores',
    descripcion:
      'Declaracion informativa de operaciones con clientes y proveedores por mas de $50,000.',
    tipo: 'informativa' as const,
    regimenes: ['pm'],
  },
  // PTU
  {
    id: 'ptu',
    dia: 30,
    mes: 5,
    titulo: 'Reparto de utilidades (PTU)',
    descripcion:
      'Fecha limite para el reparto de utilidades a los trabajadores (10% de la utilidad fiscal).',
    tipo: 'anual' as const,
    regimenes: ['pm'],
  },
];

const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const REGIMEN_FILTERS = [
  { value: 'todos', label: 'Todos los regimenes' },
  { value: 'resico', label: 'RESICO' },
  { value: 'ae', label: 'Actividad Empresarial' },
  { value: 'pm', label: 'Persona Moral' },
];

const TYPE_COLORS = {
  mensual: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  anual: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  informativa: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function CalendarioPage() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0-11
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [filtroRegimen, setFiltroRegimen] = useState('todos');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const eventsForMonth = useMemo(() => {
    return FISCAL_EVENTS.filter((event) => {
      const matchesMes = event.mes === currentMonth + 1;
      const matchesRegimen =
        filtroRegimen === 'todos' ||
        event.regimenes.includes('todos') ||
        event.regimenes.includes(filtroRegimen);
      return matchesMes && matchesRegimen;
    });
  }, [currentMonth, filtroRegimen]);

  const eventsForDay = useMemo(() => {
    if (selectedDay === null) return eventsForMonth;
    return eventsForMonth.filter((e) => e.dia === selectedDay);
  }, [selectedDay, eventsForMonth]);

  // Calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysWithEvents = useMemo(() => {
    const days = new Set<number>();
    for (const e of eventsForMonth) {
      if (e.dia <= daysInMonth) days.add(e.dia);
    }
    return days;
  }, [eventsForMonth, daysInMonth]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const isToday = (day: number) =>
    day === now.getDate() &&
    currentMonth === now.getMonth() &&
    currentYear === now.getFullYear();

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return date < today;
  };

  // Upcoming deadlines (next 30 days)
  const upcoming = useMemo(() => {
    const today = new Date();
    const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return FISCAL_EVENTS.filter((event) => {
      const eventDate = new Date(currentYear, event.mes - 1, event.dia);
      const matchesRegimen =
        filtroRegimen === 'todos' ||
        event.regimenes.includes('todos') ||
        event.regimenes.includes(filtroRegimen);
      return eventDate >= today && eventDate <= in30Days && matchesRegimen;
    }).sort((a, b) => {
      const dateA = new Date(currentYear, a.mes - 1, a.dia);
      const dateB = new Date(currentYear, b.mes - 1, b.dia);
      return dateA.getTime() - dateB.getTime();
    });
  }, [currentYear, filtroRegimen]);

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-white">
          Calendario Fiscal
        </h1>
        <select
          value={filtroRegimen}
          onChange={(e) => setFiltroRegimen(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:text-white"
        >
          {REGIMEN_FILTERS.map((f) => (
            <option key={f.value} value={f.value} className="dark:bg-[#0d1f18]">
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Upcoming alerts */}
      {upcoming.length > 0 && (
        <Card className="mb-6 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30">
          <CardContent className="pt-0">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900 dark:text-amber-300">
                  Proximas fechas limite (30 dias)
                </h3>
                <div className="mt-2 space-y-1">
                  {upcoming.slice(0, 3).map((event) => (
                    <p
                      key={event.id}
                      className="text-sm text-amber-800 dark:text-amber-200/70"
                    >
                      {event.dia} de {MESES[event.mes - 1]}: {event.titulo}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
        {/* Calendar */}
        <div>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-base">
                  {MESES[currentMonth]} {currentYear}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-medium text-gray-400 dark:text-emerald-200/30 py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>
              {/* Day grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                  (day) => {
                    const hasEvent = daysWithEvents.has(day);
                    const selected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        onClick={() =>
                          setSelectedDay(selected ? null : day)
                        }
                        className={`relative h-9 w-full rounded-lg text-sm transition-colors ${
                          selected
                            ? 'bg-emerald-700 text-white'
                            : isToday(day)
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-semibold'
                            : isPast(day)
                            ? 'text-gray-400 dark:text-emerald-200/20 hover:bg-gray-100 dark:hover:bg-emerald-900/10'
                            : 'text-gray-700 dark:text-emerald-200/70 hover:bg-gray-100 dark:hover:bg-emerald-900/20'
                        }`}
                      >
                        {day}
                        {hasEvent && !selected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-emerald-200/40">
              <span className="h-3 w-3 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              Dia con obligaciones fiscales
            </div>
            {Object.entries(TYPE_COLORS).map(([type, classes]) => (
              <div
                key={type}
                className="flex items-center gap-2 text-xs text-gray-500 dark:text-emerald-200/40"
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${classes}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                Obligacion {type}
              </div>
            ))}
          </div>
        </div>

        {/* Events detail */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {selectedDay
                ? `${selectedDay} de ${MESES[currentMonth]} ${currentYear}`
                : `Obligaciones de ${MESES[currentMonth]}`}
            </CardTitle>
            <p className="text-sm text-gray-500 dark:text-emerald-200/40">
              {eventsForDay.length === 0
                ? 'No hay obligaciones para esta fecha'
                : `${eventsForDay.length} obligacion${
                    eventsForDay.length > 1 ? 'es' : ''
                  }`}
            </p>
          </CardHeader>
          <CardContent>
            {eventsForDay.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-emerald-200/30">
                <Calendar className="h-10 w-10 mb-3 opacity-40" />
                <p className="text-sm">Sin obligaciones</p>
              </div>
            ) : (
              <div className="space-y-4">
                {eventsForDay.map((event) => (
                  <div
                    key={event.id}
                    className="border border-gray-100 dark:border-emerald-900/30 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {event.titulo}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                          TYPE_COLORS[event.tipo]
                        }`}
                      >
                        {event.tipo.charAt(0).toUpperCase() +
                          event.tipo.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-emerald-200/50">
                      {event.descripcion}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-400 dark:text-emerald-200/30">
                        Dia {event.dia} | Aplica a:{' '}
                        {event.regimenes.includes('todos')
                          ? 'Todos'
                          : event.regimenes
                              .map((r) =>
                                r === 'resico'
                                  ? 'RESICO'
                                  : r === 'ae'
                                  ? 'Act. Empresarial'
                                  : 'Persona Moral'
                              )
                              .join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
