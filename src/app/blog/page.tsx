import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const blogPosts = [
  {
    title: "Understanding Rental Agreements in India: A Complete Guide",
    author: "Jane Smith",
    date: "2024-07-15",
    excerpt: "Everything you need to know about rental agreements, from key clauses to the registration process. Ensure you are protected as a landlord or tenant...",
    image: PlaceHolderImages[0],
    slug: "/blog/understanding-rental-agreements"
  },
  {
    title: "Notarized vs. Registered Agreement: What's the Difference?",
    author: "John Doe",
    date: "2024-07-10",
    excerpt: "One of the most common questions we get. This post breaks down the key differences, pros, and cons of notarized and registered agreements in India.",
    image: PlaceHolderImages[4],
    slug: "/blog/notarized-vs-registered"
  },
  {
    title: "5 Essential Clauses for Your Partnership Deed",
    author: "Anil Kumar",
    date: "2024-07-05",
    excerpt: "Starting a business with a partner? A solid partnership deed is crucial. We cover the 5 must-have clauses to protect your business and relationship.",
    image: PlaceHolderImages[3],
    slug: "/blog/5-clauses-for-partnership-deed"
  },
];

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
                  <Link href={post.slug} className="block">
                    <CardHeader className="p-0">
                      <div className="relative h-56 w-full">
                        <Image
                          src={post.image.imageUrl}
                          alt={post.title}
                          layout="fill"
                          objectFit="cover"
                          data-ai-hint={post.image.imageHint}
                        />
                      </div>
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
