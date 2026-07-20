'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artigos..."
          className="w-48 sm:w-64 px-4 py-2 text-sm 
                     bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/50
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                     backdrop-blur-sm"
        />
        <Search 
          size={16} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" 
        />
      </div>
    </form>
  );
}