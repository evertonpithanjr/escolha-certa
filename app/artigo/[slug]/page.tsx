import { getPostData, getSortedPostsData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Gera os paths estáticos para SSG
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Gera metadata para SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Escolha Certa`,
    description: post.excerpt,
  };
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  // Converter Markdown simples em HTML
  const contentHtml = convertMarkdownToHtml(post.content);

  // Dados estruturados para SEO
  const schemaData = post.isComparativo
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: post.title,
        description: post.excerpt,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Echo Dot',
            url: 'https://amazon.com.br/echo-dot',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Nest Mini',
            url: 'https://store.google.com',
          },
        ],
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          '@type': 'Organization',
          name: 'Escolha Certa',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Escolha Certa',
          url: 'http://localhost:3000',
        },
      };

  return (
    <article className="max-w-3xl mx-auto">
      {/* Dados estruturados JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Botão Voltar */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-text-muted hover:text-brand-700 transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Voltar para home
      </Link>

      {/* Cabeçalho do Artigo */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
            {post.category}
          </span>
          {post.isComparativo && (
            <span className="text-xs font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              Comparativo
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          {post.title}
        </h1>

        <time className="text-text-muted text-sm">
          {new Date(post.date).toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
          })}
        </time>
      </header>

      {/* Conteúdo do Artigo */}
      <div 
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Call to Action Final */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="bg-background-subtle rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold mb-2">Gostou deste comparativo?</h3>
          <p className="text-text-secondary mb-4">
            Compartilhe com quem também precisa tomar essa decisão!
          </p>
          <Link href="/" className="btn-primary">
            Ver mais artigos
          </Link>
        </div>
      </div>
    </article>
  );
}

// Função para converter Markdown em HTML
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Converter cabeçalhos
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Converter negrito
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

  // Converter itálico
  html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

  // Converter listas não ordenadas
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
      html = html.replace(/(<li>[\s\S]*?<\/li>)/gi, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>');

  // Converter parágrafos
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Limpar tags p vazias
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[123]>)/g, '$1');
  html = html.replace(/(<\/h[123]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');

  // Converter tabelas
  html = convertTablesToHtml(html);

  // Converter links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gi, '<a href="$2" target="_blank" class="text-brand-700 underline">$1</a>');

  return html;
}

// Função para converter tabelas Markdown
function convertTablesToHtml(html: string): string {
  const tableRegex = /\|(.+)\|\n\|([\s\-|:]+)\|\n((?:\|.+\|\n?)+)/g;
  
  return html.replace(tableRegex, (match: string, header: string, separator: string, rows: string) => {
    const headers = header.split('|').map((h: string) => h.trim()).filter((h: string) => h);
    const rowLines = rows.trim().split('\n').filter((r: string) => r);
    const tableRows = rowLines.map((row: string) => {
      const cells = row.split('|').map((c: string) => c.trim()).filter((c: string) => c);
      return `<tr>${cells.map((cell: string) => `<td class="border border-gray-300 px-4 py-2">${cell}</td>`).join('')}</tr>`;
    }).join('');

    return `
      <div class="overflow-x-auto my-6">
        <table class="min-w-full border-collapse border border-gray-300">
          <thead class="bg-gray-50">
            <tr>${headers.map((h: string) => `<th class="border border-gray-300 px-4 py-3 text-left font-semibold">${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  });
}
