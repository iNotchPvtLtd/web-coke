"use client"
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { getStrapiURL } from "@/lib/utils";
import QueryString from "qs";
import { StrapiImage } from "./StrapiImage";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/testimonial";
  const baseUrl = getStrapiURL();
  
   const query = QueryString.stringify({
    populate: {
      card: {
        populate: {
          image: {
            fields: ["url", "alternativeText", "name"],
          },
        },
        fields: ["id", "text", "heading", "subHeading"],
      },
    },
  });
 
    const url = new URL(path, baseUrl);
    url.search = query;
  
    const data = await fetchData(url.href);
    return data;
}
interface CardProps {
  id: number;
  heading: string;
  subHeading: string;
  text: string;
  image: {
    name: string;
    alternativeText: string | null;
    url: string;
  };
}

interface TestimonialsProps {
    id: number;
    card: CardProps[];
}

export function Testimonials() {

  const [testimonialsData, setTestimonialsData] = useState<TestimonialsProps| null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loader();
      if (data) {
        setTestimonialsData(data);
      }
    };

    fetchData();
  }, []);

  if (!testimonialsData) return null;
  const cards = testimonialsData.card;

  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.id} className="lg:col-span-2 xl:col-auto">
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal ">
                {card.text}
              </p>
              <Avatar {...card} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

function Avatar(props: CardProps) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <StrapiImage
          src={props.image.url}
          width={40}
          height={40}
          alt="Avatar"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.heading}</div>
        <div className="text-gray-600 dark:text-gray-400">
          {props.subHeading}
        </div>
      </div>
    </div>
  );
}
