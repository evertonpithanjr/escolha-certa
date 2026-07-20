import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <header className="bg-purple-950/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Logo / Nome */}
        <Link 
          href="/" 
          className="text-lg font-bold text-white tracking-tight hover:text-blue-300 transition-colors shrink-0"
        >
          Escolhendo Certo
        </Link>

        {/* Categorias */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/categoria/casa-inteligente" 
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Casa Inteligente
          </Link>
          <Link 
            href="/categoria/eletroportateis" 
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Eletroportáteis
          </Link>
          <Link 
            href="/categoria/iluminacao" 
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Iluminação
          </Link>
        </nav>

        {/* Barra de Busca */}
        <div className="w-full max-w-[200px] shrink-0">
          <SearchBar />
        </div>
        
      </header>
    </div>
  );
}