import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Benefits } from "@/components/Benefits";
import { ContentWithImage } from "@/components/ContentWithImage";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

export default function Home() {
  return (
    <Container>
      <Hero/>
      <SectionHeading/>
      <Benefits/>
      <ContentWithImage/>
      <SectionHeading/>
      <Video/>
      <SectionHeading/>
      <Testimonials/>
      <SectionHeading/>
      <Faq/>
      <Cta/>
    </Container>
  );
}

const heroData = {
  id: 1,
  __component: "layout.hero",
  heading: "Free Landing Page Template for startups",
  text: "Nextly is a free landing page & marketing website template for startups and indie projects. Its built with Next.js & TailwindCSS. And its completely open-source.",
  cta: {
    id: 7,
    href: "https://github.com/PaulBratslavsky/next-strapi-template-starter-code",
    text: "Starter Code",
    external: true,
  },
  image: {
    id: 2,
    url: "/img/hero.png",
    alternativeText: "hero image",
    name: "hero.png",
  },
};

const sectionHeading = {
  id: 1,
  __component: "layout.section-heading",
  preHeading: "Section Pre Heading",
  heading: "Section Heading",
  text: "Section Text Description",
};

const benefitsData = {
  id: 1,
  __component: "layout.content-items",
  heading: "Why Choose Us?",
  text: "We are a team of experienced professionals who are passionate about what we do. We are committed to providing high-quality services to our clients. Here are some reasons why you should choose us.",
  imageRight: null,
  image: {
    id: 3,
    url: "/img/benefit-one.png",
    alternativeText: null,
    name: "benefit-one.png",
  },
  item: [
    {
      id: 1,
      text: "We are committed to providing high-quality services to our clients.",
      heading: "Quality Service",
      icon: "CHECK",
    },
    {
      id: 2,
      text: "We are a team of experienced professionals who are passionate about what we do.",
      heading: "Experienced Professionals",
      icon: "CHECK",
    },
    {
      id: 3,
      text: "We are committed to providing high-quality services to our clients.",
      heading: "Customer Satisfaction",
      icon: "CHECK",
    },
  ],
};

const contentWithImage = {
  id: 1,
  __component: "layout.content-image",
  heading: "Why Choose Us?",
  text: "We are a team of experienced professionals who are passionate about what we do. We are committed to providing high-quality services to our clients. Here are some reasons why you should choose us.",
  imageRight: true,
  image: {
    id: 4,
    url: "/img/benefit-two.png",
    alternativeText: null,
    name: "benefit-two.png",
  },
};

const videoData = {
  id: 1,
  videoId: "fZ0D0cnR88E",
};

const testimonialsData = {
  id: 1,
  __component: "layout.card-quote",
  card: [
    {
      id: 1,
      text: "Share a real testimonial that hits some of your benefits from one of your popular customer.",
      heading: "Jane Steiner",
      subHeading: "VP Sales at Google",
      image: {
        id: 7,
        url: "/img/user1.jpg",
        alternativeText: null,
        name: "user1.jpg",
      },
    },
    {
      id: 2,
      text: "Make sure you only pick the right sentence to keep it short and simple.",
      heading: "Dylan Ambrose",
      subHeading: "Lead marketer at Netflix",
      image: {
        id: 8,
        url: "/img/user2.jpg",
        alternativeText: null,
        name: "user2.jpg",
      },
    },
    {
      id: 3,
      text: "This is an awesome landing page template I've seen. I would use this for anything.",
      heading: "Gabrielle Winston",
      subHeading: "Co-founder of Acme Inc",
      image: {
        id: 6,
        url: "/img/user3.jpg",
        alternativeText: null,
        name: "user3.jpg",
      },
    },
  ],
};

const faqsData = {
  id: 1,
  __component: "layout.fa-qs",
  questions: {
    data: [
      {
        id: 1,
        question: "Is this template free to use?",
        answer: "Yes, this template is completely free to use.",
        createdAt: "2024-05-21T18:57:03.385Z",
        updatedAt: "2024-05-21T18:57:03.931Z",
        publishedAt: "2024-05-21T18:57:03.929Z",
      },
      {
        id: 2,
        question: "Can I use this in a commercial project?",
        answer: "Yes, this you can.",
        createdAt: "2024-05-21T18:57:42.594Z",
        updatedAt: "2024-05-21T18:57:43.231Z",
        publishedAt: "2024-05-21T18:57:43.231Z",
      },
      {
        id: 3,
        question: "What is your refund policy?",
        answer: "There is none, since this is completely free project for you to use.",
        createdAt: "2024-05-21T18:58:44.653Z",
        updatedAt: "2024-05-21T18:58:45.206Z",
        publishedAt: "2024-05-21T18:58:45.206Z",
      },
    ],
  },
};

const ctaData = {
  id: 1,
  __component: "layout.cta",
  heading: "Want an easy way to deploy your Strapi backend?",
  subHeading: "See how Strapi Cloud can help you.  Get CDN, database, email, and file storage all included.",
  cta: {
    id: 8,
    href: "https://strapi.io/cloud",
    text: "Try Strapi Cloud",
    external: true,
  },
};
