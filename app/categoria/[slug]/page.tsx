import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// Mapeamento de categorias
const categories = {
  'casa-inteligente': {
    name: 'Casa Inteligente',
  },
  'eletroportateis': {
    name: 'Eletroportáteis',
  },
  'iluminacao': {
    name: 'Iluminação',
  },
};

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories[slug as keyof typeof categories];
  
  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | Escolhendo Certo`,
    description: `Todos os artigos, reviews e comparativos sobre ${category.name}.`,
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories[slug as keyof typeof categories];
  
  if (!category) {
    notFound();
  }

  const allPosts = getSortedPostsData();
  
  // Filtra os posts pela categoria
  const categoryPosts = allPosts.filter((post) => {
    const postCategorySlug = post.category.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    
    return postCategorySlug === slug;
  });

  return (
    <div className="max-w-3xl mx-auto">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-text-muted hover:text-brand-700 transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Voltar para home
      </Link>

      <header className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold mb-3">{category.name}</h1>
        <p className="text-text-secondary text-lg">
          Guias, reviews e comparativos sobre {category.name.toLowerCase()} para te ajudar a escolher o melhor produto.
        </p>
        <p className="text-sm text-text-muted mt-2">
          {categoryPosts.length} {categoryPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </p>
      </header>

      {categoryPosts.length === 0 ? (
        <div className="text-center py-12 bg-background-subtle rounded-lg">
          <p className="text-text-muted mb-4">
            Ainda não temos artigos publicados para esta categoria.
          </p>
          <Link href="/" className="btn-discreet inline-block">
            Voltar para home
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {categoryPosts.map((post) => (
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