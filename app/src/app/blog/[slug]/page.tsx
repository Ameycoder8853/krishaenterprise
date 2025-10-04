
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { blogPosts, PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User } from "lucide-react";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// This function generates the static paths for each blog post
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const authorAvatar = PlaceHolderImages.find(
    (img) =>
      post.author === "Rohan Sharma" && img.id === "testimonial-1" ||
      post.author === "Priya Mehta" && img.id === "testimonial-2" ||
      post.author === "Anil Kumar" && img.id === "testimonial-3" ||
      post.author === "Jane Smith" && img.id === 'testimonial-2' ||
      post.author === "John Doe" && img.id === 'testimonial-1'
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="container max-w-4xl py-12 md:py-20">
          <header className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                {authorAvatar && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={authorAvatar.imageUrl} alt={post.author} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </header>

          {post.image && (
            <div className="relative mb-8 h-64 md:h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={post.image.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={post.image.imageHint}
                priority
              />
            </div>
          )}

          <div className="prose prose-lg mx-auto max-w-full dark:prose-invert">
            <p className="lead">{post.excerpt}</p>
            {post.content && <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
