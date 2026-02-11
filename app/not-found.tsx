import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <svg viewBox="0 0 36 36" fill="none" className="h-12 w-12">
            <rect x="4" y="12" width="4" height="12" rx="2" fill="#6366f1"/>
            <rect x="11" y="6" width="4" height="24" rx="2" fill="#7c3aed"/>
            <rect x="18" y="10" width="4" height="16" rx="2" fill="#8b5cf6"/>
            <rect x="25" y="4" width="4" height="28" rx="2" fill="#6366f1"/>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Página no encontrada
        </h1>
        <p className="text-base text-gray-500">
          La página que buscas no existe, fue movida o no está disponible
          temporalmente.
        </p>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
