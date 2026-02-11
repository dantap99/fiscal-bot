'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Calculator, Check, ArrowRight } from 'lucide-react';

type Regimen = {
  nombre: string;
  descripcion: string;
  isrMensual: number;
  isrAnual: number;
  ivaMensual: number;
  deducciones: boolean;
  requisitos: string[];
  elegible: boolean;
  razon?: string;
};

// ISR Table Art. 96 LISR (monthly)
const ISR_TABLE_MONTHLY = [
  { limInf: 0.01, limSup: 746.04, cuota: 0, pct: 1.92 },
  { limInf: 746.05, limSup: 6332.05, cuota: 14.32, pct: 6.4 },
  { limInf: 6332.06, limSup: 11128.01, cuota: 371.83, pct: 10.88 },
  { limInf: 11128.02, limSup: 12935.82, cuota: 893.63, pct: 16.0 },
  { limInf: 12935.83, limSup: 15487.71, cuota: 1182.88, pct: 17.92 },
  { limInf: 15487.72, limSup: 31236.49, cuota: 1640.18, pct: 21.36 },
  { limInf: 31236.5, limSup: 49233.0, cuota: 5004.12, pct: 23.52 },
  { limInf: 49233.01, limSup: 93993.9, cuota: 9236.89, pct: 30.0 },
  { limInf: 93993.91, limSup: 125325.2, cuota: 22665.17, pct: 32.0 },
  { limInf: 125325.21, limSup: 375975.61, cuota: 32691.18, pct: 34.0 },
  { limInf: 375975.62, limSup: Infinity, cuota: 117912.32, pct: 35.0 },
];

// RESICO rates (monthly)
const RESICO_TABLE = [
  { limSup: 25000, tasa: 1.0 },
  { limSup: 50000, tasa: 1.1 },
  { limSup: 83333.33, tasa: 1.5 },
  { limSup: 208333.33, tasa: 2.0 },
  { limSup: 291666.67, tasa: 2.5 },
];

function calcISRMensual(ingresoMensual: number): number {
  for (const row of ISR_TABLE_MONTHLY) {
    if (ingresoMensual >= row.limInf && ingresoMensual <= row.limSup) {
      const excedente = ingresoMensual - row.limInf;
      return row.cuota + excedente * (row.pct / 100);
    }
  }
  // Above max
  const last = ISR_TABLE_MONTHLY[ISR_TABLE_MONTHLY.length - 1];
  const excedente = ingresoMensual - last.limInf;
  return last.cuota + excedente * (last.pct / 100);
}

function calcRESICOMensual(ingresoMensual: number): number {
  for (const row of RESICO_TABLE) {
    if (ingresoMensual <= row.limSup) {
      return ingresoMensual * (row.tasa / 100);
    }
  }
  // Exceeds RESICO limit
  return ingresoMensual * (2.5 / 100);
}

const ACTIVIDADES = [
  'Comercio (compra-venta de productos)',
  'Servicios profesionales (freelance, consultoria)',
  'Restaurante o alimentos',
  'Servicios tecnologicos o digitales',
  'Manufactura o produccion',
  'Transporte',
  'Salud (medico, dentista, psicologo)',
  'Educacion y capacitacion',
  'Construccion',
  'Otro',
];

export default function SimuladorPage() {
  const [actividad, setActividad] = useState('');
  const [ingresosAnuales, setIngresosAnuales] = useState('');
  const [tieneEmpleados, setTieneEmpleados] = useState<boolean | null>(null);
  const [emiteFacturas, setEmiteFacturas] = useState<boolean | null>(null);
  const [resultado, setResultado] = useState<Regimen[] | null>(null);

  const handleSimular = () => {
    const ingresos = parseFloat(ingresosAnuales.replace(/,/g, ''));
    if (isNaN(ingresos) || ingresos <= 0) return;

    const ingresoMensual = ingresos / 12;

    // RESICO
    const resicoElegible = ingresos <= 3500000;
    const resicoISRMensual = resicoElegible
      ? calcRESICOMensual(ingresoMensual)
      : 0;

    const resico: Regimen = {
      nombre: 'RESICO',
      descripcion:
        'Regimen Simplificado de Confianza. Ideal para personas fisicas con ingresos hasta $3.5M anuales.',
      isrMensual: resicoISRMensual,
      isrAnual: resicoISRMensual * 12,
      ivaMensual: ingresoMensual * 0.16,
      deducciones: false,
      requisitos: [
        'Ingresos hasta $3,500,000 anuales',
        'Solo personas fisicas',
        'Emitir facturas por todos los ingresos',
        'No ser socio o accionista',
      ],
      elegible: resicoElegible,
      razon: !resicoElegible
        ? 'Tus ingresos exceden el limite de $3,500,000 anuales'
        : undefined,
    };

    // Actividad Empresarial
    const isrAEMensual = calcISRMensual(ingresoMensual);

    // Assume ~30% deductions for estimation
    const ingresoMensualConDeducciones = ingresoMensual * 0.7;
    const isrAEConDeducciones = calcISRMensual(ingresoMensualConDeducciones);

    const actividadEmpresarial: Regimen = {
      nombre: 'Actividad Empresarial y Profesional',
      descripcion:
        'Sin limite de ingresos. Permite deducciones de gastos del negocio.',
      isrMensual: isrAEConDeducciones,
      isrAnual: isrAEConDeducciones * 12,
      ivaMensual: ingresoMensual * 0.16,
      deducciones: true,
      requisitos: [
        'Sin limite de ingresos',
        'Contabilidad completa',
        'Emitir y recibir facturas',
        'Declaraciones mensuales y anual',
      ],
      elegible: true,
    };

    // Persona Moral (if has employees or high income)
    const isrPM = ingresoMensual * 0.7 * 0.3; // 30% on profit (assuming 30% margin)
    const personaMoral: Regimen = {
      nombre: 'Persona Moral (Regimen General)',
      descripcion:
        'Para empresas constituidas como sociedad. Tasa fija del 30% sobre utilidad.',
      isrMensual: isrPM,
      isrAnual: isrPM * 12,
      ivaMensual: ingresoMensual * 0.16,
      deducciones: true,
      requisitos: [
        'Constituirse como sociedad ante notario',
        'Contabilidad completa',
        'Pago provisional mensual',
        'Declaracion anual en marzo',
      ],
      elegible: true,
    };

    const regimenes = [resico, actividadEmpresarial];
    if (tieneEmpleados || ingresos > 2000000) {
      regimenes.push(personaMoral);
    }

    setResultado(regimenes);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);

  const getBestOption = () => {
    if (!resultado) return null;
    const elegibles = resultado.filter((r) => r.elegible);
    if (elegibles.length === 0) return null;
    return elegibles.reduce((min, r) =>
      r.isrAnual < min.isrAnual ? r : min
    );
  };

  const bestOption = getBestOption();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-white mb-6">
        Simulador de Regimen Fiscal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Datos de tu actividad
            </CardTitle>
            <CardDescription>
              Completa la informacion para comparar los regimenes fiscales
              disponibles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Actividad */}
            <div>
              <Label htmlFor="actividad" className="mb-2">
                Tipo de actividad
              </Label>
              <select
                id="actividad"
                value={actividad}
                onChange={(e) => setActividad(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring dark:text-white"
              >
                <option value="" className="dark:bg-[#0d1f18]">
                  Selecciona una actividad
                </option>
                {ACTIVIDADES.map((a) => (
                  <option key={a} value={a} className="dark:bg-[#0d1f18]">
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Ingresos */}
            <div>
              <Label htmlFor="ingresos" className="mb-2">
                Ingresos anuales estimados (MXN)
              </Label>
              <Input
                id="ingresos"
                type="text"
                placeholder="Ejemplo: 500000"
                value={ingresosAnuales}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setIngresosAnuales(val);
                }}
              />
              {ingresosAnuales && (
                <p className="text-xs text-gray-500 dark:text-emerald-200/40 mt-1">
                  Mensual estimado:{' '}
                  {formatCurrency(
                    parseFloat(ingresosAnuales.replace(/,/g, '')) / 12 || 0
                  )}
                </p>
              )}
            </div>

            {/* Empleados */}
            <div>
              <Label className="mb-3">Tienes empleados?</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={tieneEmpleados === true ? 'default' : 'outline'}
                  onClick={() => setTieneEmpleados(true)}
                  className={
                    tieneEmpleados === true
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      : 'dark:border-emerald-800 dark:text-emerald-200/70'
                  }
                >
                  Si
                </Button>
                <Button
                  type="button"
                  variant={tieneEmpleados === false ? 'default' : 'outline'}
                  onClick={() => setTieneEmpleados(false)}
                  className={
                    tieneEmpleados === false
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      : 'dark:border-emerald-800 dark:text-emerald-200/70'
                  }
                >
                  No
                </Button>
              </div>
            </div>

            {/* Facturas */}
            <div>
              <Label className="mb-3">Emites facturas (CFDI)?</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={emiteFacturas === true ? 'default' : 'outline'}
                  onClick={() => setEmiteFacturas(true)}
                  className={
                    emiteFacturas === true
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      : 'dark:border-emerald-800 dark:text-emerald-200/70'
                  }
                >
                  Si
                </Button>
                <Button
                  type="button"
                  variant={emiteFacturas === false ? 'default' : 'outline'}
                  onClick={() => setEmiteFacturas(false)}
                  className={
                    emiteFacturas === false
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      : 'dark:border-emerald-800 dark:text-emerald-200/70'
                  }
                >
                  No
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSimular}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-full"
              disabled={
                !actividad ||
                !ingresosAnuales ||
                tieneEmpleados === null ||
                emiteFacturas === null
              }
            >
              Simular regimenes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {resultado ? (
            <>
              {bestOption && (
                <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30">
                  <CardContent className="pt-0">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-200 dark:bg-emerald-800/40 flex items-center justify-center flex-shrink-0">
                        <Check className="h-5 w-5 text-emerald-800 dark:text-emerald-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">
                          Recomendacion: {bestOption.nombre}
                        </h3>
                        <p className="text-sm text-emerald-800 dark:text-emerald-200/70 mt-1">
                          Con tus ingresos de{' '}
                          {formatCurrency(parseFloat(ingresosAnuales))} anuales,
                          el regimen {bestOption.nombre} te genera el menor pago
                          de ISR estimado: {formatCurrency(bestOption.isrAnual)}{' '}
                          al ano.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {resultado.map((regimen) => (
                <Card
                  key={regimen.nombre}
                  className={`${
                    !regimen.elegible ? 'opacity-60' : ''
                  } ${
                    bestOption?.nombre === regimen.nombre
                      ? 'border-emerald-500 dark:border-emerald-600'
                      : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {regimen.nombre}
                      </CardTitle>
                      {!regimen.elegible && (
                        <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full">
                          No elegible
                        </span>
                      )}
                      {bestOption?.nombre === regimen.nombre && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full">
                          Recomendado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-emerald-200/50">
                      {regimen.descripcion}
                    </p>
                    {regimen.razon && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        {regimen.razon}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-emerald-900/10 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-emerald-200/40">
                          ISR mensual estimado
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(regimen.isrMensual)}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-emerald-900/10 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-emerald-200/40">
                          ISR anual estimado
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(regimen.isrAnual)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-500 dark:text-emerald-200/50 uppercase tracking-wider">
                        Requisitos
                      </p>
                      {regimen.requisitos.map((req) => (
                        <div key={req} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 dark:text-emerald-200/60">
                            {req}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-start gap-2">
                        <span
                          className={`text-sm font-medium ${
                            regimen.deducciones
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-gray-400 dark:text-emerald-200/30'
                          }`}
                        >
                          {regimen.deducciones
                            ? 'Permite deducciones'
                            : 'No permite deducciones'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30">
                <CardContent className="pt-0">
                  <p className="text-sm text-amber-800 dark:text-amber-200/70">
                    Nota: Los calculos de Actividad Empresarial asumen un 30% de
                    deducciones sobre tus ingresos. El monto real depende de tus
                    gastos deducibles. Consulta con un contador para un calculo
                    preciso.
                  </p>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <Calculator className="h-12 w-12 text-gray-300 dark:text-emerald-900/50 mb-4" />
              <h3 className="text-lg font-medium text-gray-500 dark:text-emerald-200/40">
                Completa el formulario
              </h3>
              <p className="text-sm text-gray-400 dark:text-emerald-200/30 mt-1 max-w-sm">
                Ingresa tus datos para ver una comparativa de regimenes fiscales
                con calculos estimados de ISR.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
