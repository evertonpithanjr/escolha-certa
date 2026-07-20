import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl font-bold text-brand-700">Escolhendo Certo</span>
          </Link>

          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/categoria/casa-inteligente" className="text-sm font-medium text-text-secondary hover:text-brand-700 transition-colors">
              Casa Inteligente
            </Link>
            <Link href="/categoria/eletroportateis" className="text-sm font-medium text-text-secondary hover:text-brand-700 transition-colors">
              Eletroportáteis
            </Link>
            <Link href="/categoria/iluminacao" className="text-sm font-medium text-text-secondary hover:text-brand-700 transition-colors">
              Iluminação
            </Link>
          </nav>

          {/* Busca */}
          <SearchBar />
        </div>
      </div>
    </header>
  );
}