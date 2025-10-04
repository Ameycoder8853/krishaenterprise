
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { blogPosts, PlaceHolderImages } from "@/lib/placeholder-images";


export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30">
        <section className="py-12 md:py-20 text-center">
          <div className="container">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
              Our Blog
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Insights and advice on legal documentation, property, and business in India.
            </p>
          </div>
        </section>

        <section className="py-12 md:pb-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.title} className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <CardHeader className="p-0">
                      {post.image && <div className="relative h-56 w-full">
                        <Image
                          src={post.image.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          data-ai-hint={post.image.imageHint}
                        />
                      </div>}
                    </CardHeader>
                    <CardContent className="p-6">
                      <h2 className="font-headline text-xl font-semibold mb-2">{post.title}</h2>
                      <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1.5" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          {post.date}
                        </div>
                      </div>
                      <p className="text-foreground/80 mb-4">{post.excerpt}</p>
                      <Button variant="link" className="p-0 font-bold text-primary">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
