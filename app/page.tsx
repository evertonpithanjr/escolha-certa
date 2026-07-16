import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 border-b border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Escolha Certa
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Comparativos honestos e guias de compra para você tomar a melhor decisão. 
          Casa inteligente e eletroportáteis analisados com profundidade.
        </p>
      </section>

      {/* Lista de Artigos */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📝</span> Últimos Artigos
        </h2>
        
        {allPostsData.length === 0 ? (
          <p className="text-text-muted text-center py-8">
            Nenhum artigo encontrado. Crie seu primeiro artigo em Markdown!
          </p>
        ) : (
          <div className="grid gap-6">
            {allPostsData.map((post) => (
              <article 
                key={post.slug}
                className="bg-background-subtle rounded-lg p-6 border border-gray-200 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
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
                    
                    <Link href={`/artigo/${post.slug}`} className="block">
                      <h3 className="text-xl font-bold text-text-primary hover:text-brand-700 transition-colors mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-text-secondary mb-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <time>{new Date(post.date).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</time>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/artigo/${post.slug}`}
                    className="btn-discreet whitespace-nowrap"
                  >
                    Ler mais →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Categorias */}
      <section className="border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold mb-6">
          <span>📂</span> Categorias
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Link href="/categoria/casa-inteligente" className="p-4 bg-background-subtle rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors text-center">
            <div className="text-2xl mb-2">🏠</div>
            <div className="font-medium">Casa Inteligente</div>
          </Link>
          <Link href="/categoria/eletroportateis" className="p-4 bg-background-subtle rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors text-center">
            <div className="text-2xl mb-2">🔌</div>
            <div className="font-medium">Eletroportáteis</div>
          </Link>
          <Link href="/categoria/iluminacao" className="p-4 bg-background-subtle rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors text-center">
            <div className="text-2xl mb-2">💡</div>
            <div className="font-medium">Iluminação</div>
          </Link>
        </div>
      </section>
    </div>
  );
}