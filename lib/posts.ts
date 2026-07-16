import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Caminho para a pasta de conteúdo
const postsDirectory = path.join(process.cwd(), 'content/artigos');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  isComparativo: boolean;
}

export function getSortedPostsData(): PostData[] {
  // Se a pasta ainda não existir, retorna array vazio para não quebrar o site
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      category: matterResult.data.category as string,
      excerpt: matterResult.data.excerpt as string,
      isComparativo: matterResult.data.isComparativo as boolean,
    };
  });

  // Ordena os posts por data (mais recente primeiro)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    title: matterResult.data.title as string,
    date: matterResult.data.date as string,
    category: matterResult.data.category as string,
    excerpt: matterResult.data.excerpt as string,
    isComparativo: matterResult.data.isComparativo as boolean,
  };
}