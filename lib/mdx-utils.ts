import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostFrontmatter } from '@/types/mdx';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllMDXPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data: frontmatter, content } = matter(fileContents);

      return {
        slug,
        frontmatter: frontmatter as BlogPostFrontmatter,
        content,
      };
    })
    .filter((post) => post.frontmatter.published !== false)
    .sort((a, b) => new Date(b.frontmatter.dateISO).getTime() - new Date(a.frontmatter.dateISO).getTime());

  return allPostsData;
}

export function getMDXPostBySlug(slug: string): BlogPost | undefined {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return undefined;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    return {
      slug,
      frontmatter: frontmatter as BlogPostFrontmatter,
      content,
    };
  } catch (error) {
    return undefined;
  }
}

export function getMDXPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllMDXPosts();
  return allPosts.filter((post) => post.frontmatter.category === category);
}

export function getAllMDXCategories(): string[] {
  const allPosts = getAllMDXPosts();
  return [...new Set(allPosts.map((post) => post.frontmatter.category))];
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames.filter((fileName) => fileName.endsWith('.mdx')).map((fileName) => fileName.replace(/\.mdx$/, ''));
}
