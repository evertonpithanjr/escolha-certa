import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { FileText, Home, Zap, Lightbulb } from 'lucide-react';

export default function Home() {
  const allPosts = getSortedPostsData();

  const categories = [
    { 
      slug: 'casa-inteligente', 
      name: 'Casa Inteligente', 
      icon: Home,
      description: 'Dispositivos IoT, automação e assistentes virtuais',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400'
    },
    { 
      slug: 'eletroportateis', 
      name: 'Eletroportáteis', 
      icon: Zap,
      description: 'Reviews e comparativos dos melhores aparelhos',
      color: 'bg-purple-50 border-purple-200 hover:border-purple-400'
    },
    { 
      slug: 'iluminacao', 
      name: 'Iluminação', 
      icon: Lightbulb,
      description: 'Lâmpadas smart e sistemas de iluminação inteligente',
      color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 lg:py-32">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Escolhendo Certo
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Comparativos honestos e guias de compra para você tomar a melhor decisão. 
              Casa inteligente e eletroportáteis analisados com profundidade.
            </p>
            <div className="flex gap-4">
              <Link href="/busca" className="btn-primary text-lg px-8 py-4">
                Explorar Artigos
              </Link>
              <Link href="#categorias" className="btn-discreet text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Ver Categorias
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="py-16 lg:py-24 bg-gray-50">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-slate-900">
            Explore por Categoria
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Encontre análises detalhadas e comparativos dos produtos que você precisa
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link 
                key={category.slug}
                href={`/categoria/${category.slug}`}
                className={`group block p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${category.color}`}
              >
                <category.icon className="w-12 h-12 mb-4 text-slate-700 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  {category.name}
                </h3>
                <p className="text-slate-600">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ÚLTIMOS ARTIGOS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
            Últimos Artigos
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl">
            Análises recentes e comparativos detalhados
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allPosts.slice(0, 4).map((post) => (
              <article key={post.slug} className="card-modern group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-primary">{post.category}</span>
                  {post.isComparativo && (
                    <span className="badge badge-comparativo">Comparativo</span>
                  )}
                </div>
                
                <Link href={`/artigo/${post.slug}`}>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <time className="text-sm text-slate-500">
                    {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </time>
                  <Link href={`/artigo/${post.slug}`} className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center gap-1">
                    Ler mais →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {allPosts.length > 4 && (
            <div className="text-center mt-12">
              <Link href="/busca" className="btn-discreet text-lg px-8 py-3">Ver todos os artigos</Link>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="px-6 lg:px-12 max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <FileText className="w-16 h-16 mx-auto mb-4 text-blue-300" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Receba nossas melhores análises</h2>
          <p className="text-xl text-blue-100 mb-8">Sem spam. Apenas guias de compra honestos e comparativos direto no seu e-mail.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input type="email" placeholder="Seu melhor e-mail" className="flex-1 px-6 py-4 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="submit" className="btn-primary text-lg px-8 py-4 bg-white text-blue-900 hover:bg-blue-50">Inscrever-se</button>
          </form>
        </div>
      </section>
    </div>
  );
}