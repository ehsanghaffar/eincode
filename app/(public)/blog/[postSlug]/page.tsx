import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import { BlogPostContent } from "@/components/public/blog/blog-post-content";

interface BlogPostPageProps {
  params: Promise<{ postSlug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    postSlug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { postSlug } = await params;
  const post = getPostBySlug(postSlug);

  if (!post) {
    return {
      title: "Post Not Found — EINCODE Digital Lab",
    };
  }

  return {
    title: `${post.title} — EINCODE Digital Lab`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postSlug } = await params;
  const post = getPostBySlug(postSlug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <BlogPostContent post={post} />
      <Footer />
    </div>
  );
}
