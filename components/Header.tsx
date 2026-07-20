import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-purple-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="px-6 lg:px-12 h-20 flex items-center justify-between max-w-[1920px] mx-auto">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-bold text-white tracking-tight hover:text-blue-300 transition-colors"
        >
          Escolhendo Certo
        </Link>

        {/* Links de Navegação */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/categoria/casa-inteligente" 
            className="text-sm font-medium text-white hover:text-blue-300 transition-colors"
          >
            Casa Inteligente
          </Link>
          <Link 
            href="/categoria/eletroportateis" 
            className="text-sm font-medium text-white hover:text-blue-300 transition-colors"
          >
            Eletroportáteis
          </Link>
          <Link 
            href="/categoria/iluminacao" 
            className="text-sm font-medium text-white hover:text-blue-300 transition-colors"
          >
            Iluminação
          </Link>
        </nav>

        {/* Barra de Busca */}
        <div className="w-full max-w-xs">
          <SearchBar />
        </div>
        
      </div>
    </header>
  );
}