import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { FileText, Home as HomeIcon, Zap, Lightbulb } from 'lucide-react';

export default function Home() {
  const allPosts = getSortedPostsData();

  const categories = [
    { 
      slug: 'casa-inteligente', 
      name: 'Casa Inteligente', 
      icon: HomeIcon,
      description: 'Dispositivos IoT, automação e assistentes virtuais',
    },
    { 
      slug: 'eletroportateis', 
      name: 'Eletroportáteis', 
      icon: Zap,
      description: 'Reviews e comparativos dos melhores aparelhos',
    },
    { 
      slug: 'iluminacao', 
      name: 'Iluminação', 
      icon: Lightbulb,
      description: 'Lâmpadas smart e sistemas de iluminação inteligente',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="py-20 lg:py-32">
        <div className="px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Escolhendo Certo
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Comparativos honestos e guias de compra para você tomar a melhor decisão. 
              Casa inteligente e eletroportáteis analisados com profundidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/busca" className="btn-primary text-lg px-8 py-4">
                Explorar Artigos
              </Link>
              <Link href="#categorias" className="glass-card text-lg px-8 py-4 text-white hover:bg-white/20 transition-all">
                Ver Categorias
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS - Com efeito de vidro */}
      <section id="categorias" className="py-16 lg:py-24">
        <div className="px-6 lg:px-12">
          <div className="glass-section">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-white">
              Explore por Categoria
            </h2>
            <p className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto">
              Encontre análises detalhadas e comparativos dos produtos que você precisa
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((category) => (
                <Link 
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  className="glass-card group block p-8 transition-all duration-300 hover:scale-105 hover:bg-white/15"
                >
                  <category.icon className="w-12 h-12 mb-4 text-white group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {category.name}
                  </h3>
                  <p className="text-white/80">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ÚLTIMOS ARTIGOS - Com efeito de vidro */}
      <section className="py-16 lg:py-24">
        <div className="px-6 lg:px-12">
          <div className="glass-section">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              Últimos Artigos
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-2xl">
              Análises recentes e comparativos detalhados
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {allPosts.slice(0, 4).map((post) => (
                <article key={post.slug} className="glass-card group p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge badge-primary">{post.category}</span>
                    {post.isComparativo && (
                      <span className="badge badge-comparativo">Comparativo</span>
                    )}
                  </div>
                  
                  <Link href={`/artigo/${post.slug}`}>
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-white/80 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-white/60">
                      {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </time>
                    <Link href={`/artigo/${post.slug}`} className="text-blue-300 font-medium hover:text-blue-200 transition-colors inline-flex items-center gap-1">
                      Ler mais →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {allPosts.length > 4 && (
              <div className="text-center mt-12">
                <Link href="/busca" className="glass-card inline-block text-lg px-8 py-3 text-white hover:bg-white/15 transition-all">
                  Ver todos os artigos
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}