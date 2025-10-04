import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// The JSON file is not a module, so we have to access the data directly.
export const PlaceHolderImages: ImagePlaceholder[] = (data as any).placeholderImages;

export const blogPosts = [
    {
      id: "1",
      title: "The Future of Legal Tech in India",
      author: "Priya Mehta",
      date: "2024-07-28",
      excerpt: "Exploring the rapid advancements in legal technology and its impact on the Indian legal landscape. From AI-powered research to online dispute resolution, we'll delve into the trends shaping the future of law.",
      image: PlaceHolderImages.find(img => img.id === 'ai-feature-image'),
      slug: "future-of-legal-tech-in-india",
      content: "The legal landscape in India is undergoing a significant transformation, driven by the adoption of technology. This post explores the key trends and innovations that are reshaping how legal services are delivered and accessed across the country. We'll look at the rise of AI-powered legal research tools that can analyze vast amounts of case law in seconds, the emergence of online dispute resolution (ODR) platforms that offer a more accessible and efficient way to resolve conflicts, and the growing use of blockchain for smart contracts and secure document management. As these technologies mature, they promise to make the legal system more efficient, transparent, and accessible to all."
    },
    {
      id: "2",
      title: "Understanding Rental Agreements in India: A Complete Guide",
      author: "Jane Smith",
      date: "2024-07-15",
      excerpt: "Everything you need to know about rental agreements, from key clauses to the registration process. Ensure you are protected as a landlord or tenant...",
      image: PlaceHolderImages.find(img => img.id === 'blog-post-1'),
      slug: "understanding-rental-agreements",
      content: "Renting a property in India involves a crucial legal document: the rental agreement. This document outlines the terms and conditions of the tenancy, protecting both the landlord and the tenant. This guide will walk you through the essential components of a rental agreement, including the duration of the lease, the rent amount and due date, the security deposit, and the responsibilities of both parties. We'll also discuss the importance of registering your rental agreement, a legal requirement in many states for leases longer than 11 months, and how it provides legal validity to the contract. Understanding these elements is key to a smooth and dispute-free tenancy."
    },
    {
      id: "3",
      title: "Notarized vs. Registered Agreement: What's the Difference?",
      author: "John Doe",
      date: "2024-07-10",
      excerpt: "One of the most common questions we get. This post breaks down the key differences, pros, and cons of notarized and registered agreements in India.",
      image: PlaceHolderImages.find(img => img.id === 'blog-post-2'),
      slug: "notarized-vs-registered",
      content: "When creating a legal agreement in India, you'll often encounter the terms 'notarized' and 'registered.' While both add a layer of verification to a document, they serve different purposes and offer different levels of legal protection. A notarized agreement is verified by a Notary Public, which confirms the identity of the signatories. It's a relatively simple and inexpensive process. On the other hand, a registered agreement is filed with a sub-registrar's office, making it a public record. This provides a much higher level of legal sanctity and is mandatory for certain transactions, like property sales and long-term leases. This post will help you decide which option is right for your specific needs."
    },
    {
      id: "4",
      title: "5 Essential Clauses for Your Partnership Deed",
      author: "Anil Kumar",
      date: "2024-07-05",
      excerpt: "Starting a business with a partner? A solid partnership deed is crucial. We cover the 5 must-have clauses to protect your business and relationship.",
      image: PlaceHolderImages.find(img => img.id === 'blog-post-3'),
      slug: "5-clauses-for-partnership-deed",
      content: "A partnership deed is the foundation of a business partnership. It's a legally binding document that outlines the rights, responsibilities, and profit-sharing ratios of all partners. A well-drafted partnership deed can prevent future disputes and provide a clear roadmap for the business. This article covers the five most essential clauses you should include: 1. Capital Contribution: The amount of capital each partner is investing. 2. Profit and Loss Sharing Ratio: How profits and losses will be divided. 3. Roles and Responsibilities: The specific duties of each partner. 4. Dissolution Clause: The procedure for dissolving the partnership. 5. Dispute Resolution: The mechanism for resolving disagreements between partners."
    }
  ];

    