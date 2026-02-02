export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  readTime: string;
  tags: string[];
  published?: boolean;
  author?: string;
  image?: string;
  authorBio?: string;
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
  slug: string;
}

export interface MDXPostData {
  frontmatter: BlogPostFrontmatter;
  content: string;
}

export interface BlogListPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  slug: string;
  readTime: string;
  tags: string[];
}
