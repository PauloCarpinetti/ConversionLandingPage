import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MotionProvider } from "@/components/ui/motion-provider";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_TITLE = "Clínica Odontológica";
const SITE_DESCRIPTION =
  "Cuide do seu sorriso com atendimento humanizado e equipamentos modernos. Agende sua consulta pelo WhatsApp em poucos cliques.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "clínica odontológica",
    "dentista",
    "odontologia",
    "agendar consulta",
    "clareamento dental",
    "implante dentário",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "pt_BR",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          {children}
          <WhatsAppCta source="floating_cta" />
        </MotionProvider>
      </body>
      {/*
        O <GoogleAnalytics> do @next/third-parties carrega o script via
        next/script (estratégia afterInteractive): se o script for bloqueado
        por um ad-blocker ou falhar ao carregar, isso não afeta o render do
        <body> acima nem lança erro — apenas o rastreamento fica indisponível
        (FR-011). Sem NEXT_PUBLIC_GA_ID definido, o componente nem é montado.
      */}
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
