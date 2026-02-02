import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/public/blog/blog-post-content";
import type { Metadata } from "next";
import { getMDXPostBySlug, getPostSlugs, getAllMDXPosts } from "@/lib/mdx-utils";
import type { BlogPost } from "@/types/mdx";

interface BlogPostPageProps {
  params: Promise<{ postSlug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((postSlug) => ({ postSlug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const post = getMDXPostBySlug(postSlug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eindev.ir';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImageUrl = `${baseUrl}/og-images/${post.slug}.png`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    authors: post.frontmatter.author ? [{ name: post.frontmatter.author }] : undefined,
    keywords: post.frontmatter.tags,
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      publishedTime: new Date(post.frontmatter.dateISO || post.frontmatter.date).toISOString(),
      authors: post.frontmatter.author ? [post.frontmatter.author] : undefined,
      tags: post.frontmatter.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: [ogImageUrl],
      creator: "@ehsanghaffar",
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postSlug } = await params;
  const post = getMDXPostBySlug(postSlug);

  if (!post) {
    notFound();
  }

  // Compute related posts by category or shared tags
  const all = getAllMDXPosts();
  const relatedPosts = (all || [])
    .filter((p) => p.slug !== post.slug && (p.frontmatter.category === post.frontmatter.category || p.frontmatter.tags.some((t) => post.frontmatter.tags.includes(t))))
    .slice(0, 6);

  return (
    <>
      <div>
        <BlogPostContent post={post} relatedPosts={relatedPosts} />
      </div>
    </>
  );
}
