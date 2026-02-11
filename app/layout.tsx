import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'FiscalBot - Tu asistente fiscal con IA',
  description:
    'Entiende tus obligaciones ante el SAT sin ser experto. Chat fiscal con IA, simulador de regimen, calendario fiscal y mas para PyMEs mexicanas.',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`dark bg-white dark:bg-[#091a12] text-black dark:text-white ${manrope.className} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-[100dvh] bg-gray-50 dark:bg-[#061210]">
        <SWRConfig
          value={{
            fallback: {
              '/api/user': getUser(),
              '/api/team': getTeamForUser(),
            },
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
