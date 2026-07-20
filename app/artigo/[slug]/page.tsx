import { getPostData, getSortedPostsData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const post = getPostData(slug);
    return {
      title: `${post.title} | Escolhendo Certo`,
      description: post.excerpt,
    };
  } catch {
    return { title: 'Artigo não encontrado | Escolhendo Certo' };
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostData(slug);
  } catch {
    notFound();
  }

  // Processar o conteúdo do artigo (convertendo Markdown para HTML)
  let html = post.content;
  
  // Converter listas não ordenadas (Regex corrigida e compatível com TypeScript)
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gi, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>');
  
  // Converter parágrafos
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  
  // Converter links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>');

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        Voltar para home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <span className="badge badge-primary">
          {post.category}
        </span>
        {post.isComparativo && (
          <span className="badge badge-comparativo">
            Comparativo
          </span>
        )}
      </div>
      
      <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 leading-tight">
        {post.title}
      </h1>
      
      <time className="text-slate-500 mb-10 block text-lg">
        {new Date(post.date).toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: 'long', 
          year: 'numeric' 
        })}
      </time>
      
      {/* Conteúdo do Artigo Formatado */}
      <div 
        className="prose prose-lg prose-slate max-w-none 
                   prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                   prose-headings:font-bold prose-headings:text-slate-900"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
      
      {/* Call to Action no final do artigo */}
      <div className="mt-16 pt-10 border-t border-slate-200">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Gostou desta análise?</h2>
        <p className="text-slate-600 mb-6">
          Confira outros artigos e comparativos para tomar a melhor decisão de compra.
        </p>
        <Link href="/" className="btn-primary">
          Ver mais artigos
        </Link>
      </div>
    </article>
  );
}