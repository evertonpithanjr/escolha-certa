import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NewsletterForm from "@/components/NewsletterForm";

// Fonte para o corpo do texto (Leitura confortável)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

// Fonte para Títulos (Tech/Moderno/Geométrico)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Escolhendo Certo | Comparativos e Guias de Compra Confiáveis",
  description: "Análises aprofundadas, comparativos honestos e guias de compra para casa inteligente e eletroportáteis.",
  metadataBase: new URL("https://escolha-certa.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background-main text-text-primary font-sans antialiased flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow w-full px-6 lg:px-12 py-8">
          {children}
        </main>
        
        <footer className="bg-background-subtle border-t border-gray-200 py-12 mt-12">
          <div className="px-6 lg:px-12">
            
            {/* Seção Newsletter */}
            <div className="text-center mb-10 pb-10 border-b border-gray-200">
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Receba nossas melhores análises
              </h3>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Sem spam. Apenas guias de compra honestos e comparativos direto no seu e-mail.
              </p>
              <NewsletterForm />
            </div>

            {/* Copyright e Aviso de Afiliados */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-muted">
              <p>© {new Date().getFullYear()} Escolhendo Certo. Todos os direitos reservados.</p>
              <p className="text-xs italic text-gray-400">
                Alguns links podem ser de afiliados.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}