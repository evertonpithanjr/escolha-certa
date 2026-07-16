import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function BuscaPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  const allPosts = getSortedPostsData();

  // Filtrar artigos por título ou categoria
  const filteredPosts = allPosts.filter((post) => {
    const searchLower = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Search size={28} />
          Resultados da busca
        </h1>
        {query && (
          <p className="text-text-secondary">
            Buscando por: <strong>"{query}"</strong> — {filteredPosts.length} resultado(s) encontrado(s)
          </p>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">
            Nenhum artigo encontrado para "{query}".
          </p>
          <Link href="/" className="btn-discreet mt-4 inline-block">
            Voltar para home
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <article 
              key={post.slug}
              className="bg-background-subtle rounded-lg p-6 border border-gray-200 hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-brand-700 bg-brand-50 px-2 py-1 rounded">
                  {post.category}
                </span>
                {post.isComparativo && (
                  <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded">
                    Comparativo
                  </span>
                )}
              </div>
              
              <Link href={`/artigo/${post.slug}`}>
                <h3 className="text-xl font-bold text-text-primary hover:text-brand-700 transition-colors mb-2">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-text-secondary mb-3">
                {post.excerpt}
              </p>
              
              <time className="text-sm text-text-muted">
                {new Date(post.date).toLocaleDateString('pt-BR', { 
                  day: '2-digit', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </time>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}